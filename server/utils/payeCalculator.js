// Unchangeable PAYE Calculator Variables
const PERSONAL_RELIEF = 2400;
const NSSF_RATE = 0.06;
const NSSF_CAP_EARNINGS = 108000;
const NSSF_MAX_CONTRIBUTION = NSSF_CAP_EARNINGS * NSSF_RATE;
const SHIF_RATE = 0.0275;
const HOUSING_LEVY_RATE = 0.015;

const TAX_BANDS = [
    {limit: 24000, rate: 0.10},
    {limit: 32333, rate: 0.25},
    {limit: 500000, rate: 0.30},
    {limit: 800000, rate: 0.325},
    {limit: Infinity, rate: 0.35},
];

function calculatePAYE(taxableIncome){
    let tax = 0;    
    let previousLimit = 0;

    for (const band of TAX_BANDS) { 
        if(taxableIncome > band.limit){
         const taxableInBand = Math.min(taxableIncome, band.limit) - previousLimit;
         tax += taxableInBand * band.rate;
         previousLimit = band.limit;
        }else{
            break;
        }
    }
    return Math.max(tax - PERSONAL_RELIEF, 0);
}

function calculateNetSalary({
    grossSalary = parseFloat(grossSalary),
    otherAllowances = parseFloat(otherAllowances) || 0,
    deductSHIF = !!deductSHIF,
    deductHousingLevy = !!deductHousingLevy,
    deductNSSF = !!deductNSSF,
})
{
    // Calculate the gross salary including other allowances
    const gross = Number(grossSalary) + Number(otherAllowances);

    // Calculate NSSF, SHIF, Housing Levy, and PAYE deductions based on the provided flags
    const nssfContribution = deductNSSF ? Math.min(gross * NSSF_RATE, NSSF_MAX_CONTRIBUTION) : 0;
    const shifContribution = deductSHIF ? gross * SHIF_RATE : 0;
    const housingLevy = deductHousingLevy ? gross * HOUSING_LEVY_RATE : 0;
    
    // Calculate PAYE based on the taxable income after deductions
    const taxableIncome = gross - nssfContribution - shifContribution - housingLevy;
    const paye = calculatePAYE(taxableIncome);

    // Calculate total deductions and net salary
    const totalDeductions = nssfContribution + shifContribution + housingLevy + paye;

    // Calculate net salary
    const netSalary = gross - totalDeductions;
    
    return {
        gross: round(gross),
        nssf: round(nssfContribution),
        shif: round(shifContribution),
        housingLevy: round(housingLevy),
        paye: round(paye),
        netSalary: round(netSalary),
        totalDeductions: round(totalDeductions),
    };
}

module.exports = { calculateNetSalary };