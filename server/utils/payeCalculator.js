// Unchangeable PAYE Calculator Variables
const PERSONAL_RELIEF = 2400;
const NSSF_RATE = 0.06;
const NSSF_CAP_EARNINGS = 108000;
const NSSF_MAX_CONTRIBUTION = NSSF_CAP_EARNINGS * NSSF_RATE;
const SHIF_RATE = 0.0275;
const HOUSING_LEVY_RATE = 0.015;

const TAX_BANDS = [
    { limit: 24000, rate: 0.10 },
    { limit: 32333, rate: 0.25 },
    { limit: 500000, rate: 0.30 },
    { limit: 800000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 },
];

// Added missing round helper function
const round = (num) => Math.round((Number(num) + Number.EPSILON) * 100) / 100;

function calculatePAYE(taxableIncome) {
    let tax = 0;    
    let previousLimit = 0;

    for (const band of TAX_BANDS) { 
        if (taxableIncome > previousLimit) {
            const taxableInBand = Math.min(taxableIncome, band.limit) - previousLimit;
            tax += taxableInBand * band.rate;
            previousLimit = band.limit;
        } else {
            break;
        }
    }
    return Math.max(tax - PERSONAL_RELIEF, 0);
}

function calculateNetSalary({
    grossSalary = 0,
    otherAllowances = 0,
    deductSHIF = false,
    deductHousingLevy = false,
    deductNSSF = false,
} = {}) {
    // Coerce inputs to numbers/booleans safely
    const gross = Number(grossSalary) + Number(otherAllowances);
    const isNSSF = String(deductNSSF) === "true";
    const isSHIF = String(deductSHIF) === "true";
    const isHousingLevy = String(deductHousingLevy) === "true";

    // Deductions
    const nssfContribution = isNSSF ? Math.min(gross * NSSF_RATE, NSSF_MAX_CONTRIBUTION) : 0;
    const shifContribution = isSHIF ? gross * SHIF_RATE : 0;
    const housingLevy = isHousingLevy ? gross * HOUSING_LEVY_RATE : 0;
    
    // Taxable Income & PAYE
    const taxableIncome = gross - nssfContribution - shifContribution - housingLevy;
    const paye = calculatePAYE(taxableIncome);

    // Totals
    const totalDeductions = nssfContribution + shifContribution + housingLevy + paye;
    const netSalary = gross - totalDeductions;
    
    const result = {
        gross: round(gross),
        nssf: round(nssfContribution),
        shif: round(shifContribution),
        housingLevy: round(housingLevy),
        paye: round(paye),
        netSalary: round(netSalary),
        totalDeductions: round(totalDeductions),
    };

    return result;
}

module.exports = { calculateNetSalary };