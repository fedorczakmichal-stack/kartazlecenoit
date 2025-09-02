// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = { 'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-1.0 μg/kg/min' }, 'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 μg/kg/min' }, 'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 μg/kg/min' }, 'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 μg/kg/min' }, 'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min' }, 'MILRINON': { concentration: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' }, 'PROPOFOL 1%': { concentration: '10mg/ml', dose: '1-4 mg/kg/h' }, 'PROPOFOL 2%': { concentration: '20mg/ml', dose: '1-4 mg/kg/h' }, 'MIDAZOLAM': { concentration: '50mg/50ml', dose: '1-15 mg/h' }, 'DEKSMEDETOMIDYNA': { concentration: '200μg/50ml', dose: '0.2-1.4 μg/kg/h' }, 'FENTANYL': { concentration: '500μg/50ml', dose: '25-100 μg/h' }, 'REMIFENTANYL': { concentration: '2mg/40ml', dose: '0.05-0.2 μg/kg/min' }, 'MORFINA': { concentration: '20mg/20ml', dose: '1-5 mg/h' }, 'LIGNOCAINA 1%': { concentration: '500mg/50ml', dose: '1-2 mg/min' }, 'OKSYKODON': { concentration: '20mg/20ml', dose: '1-2 mg/h' }, 'KETAMINA': { concentration: '250mg/50ml', dose: '0.5-2 mg/kg/h' }, 'ROKURONIOM': { concentration: '50mg/5ml', dose: '0.3-0.6 mg/kg/h' }, 'CISATRAKURIUM': { concentration: '20mg/10ml', dose: '0.06-0.18 mg/kg/h' }, 'INSULINA': { concentration: '50j/50ml', dose: '0.5-10 j/h' }, 'HEPARYNA': { concentration: '25000j/50ml', dose: '500-2000 j/h' }, 'FUROSEMID': { concentration: '100mg/50ml', dose: '5-20 mg/h' }, 'AMIODARON': { concentration: '300mg/50ml 5% Glc', dose: '20-50 mg/h' }, 'NITROGLICERYNA': { concentration: '25mg/50ml', dose: '5-200 μg/min' }, 'PIPERACYLINA/TAZOBAKTAM': { concentration: '18g/100ml', dose: 'wlew 24h', fixedRate: '4.2' }, 'PANTOPRAZOL': { concentration: '80mg/100ml', dose: '4.2 ml/h', fixedRate: '4.2' }, 'METOPROLOL': { concentration: '10mg/50ml', dose: '1-5 mg/h' }, 'SALBUTAMOL': { concentration: '5mg/50ml', dose: '3-20 μg/min' }, 'DIAZEPAM': { concentration: '50mg/50ml', dose: '2-10 mg/h' } };

const periodicDrugsData = { 'AMOKSYCYLINA/KWAS KLAWULANOWY': { dose: '1.2g', route: 'i.v.', frequency: 'co 8h' }, 'AMIKACYNA': { dose: '15-20mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'CEFTAZYDYM': { dose: '2g', route: 'i.v.', frequency: 'co 8h' }, 'CEFUROKSYM': { dose: '1.5g', route: 'i.v.', frequency: 'co 8h' }, 'CIPROFLOKSACYNA': { dose: '400mg', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'IMIPENEM/CYLASTATYNA': { dose: '0.5g', route: 'wlew i.v. 30min', frequency: 'co 6-8h' }, 'KOLISTYNA': { dose: 'nasyc. 9mln j, potem 4.5mln j', route: 'i.v.', frequency: 'co 12h' }, 'LEWOFLOKSACYNA': { dose: '500mg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'LINEZOLID': { dose: '600mg', route: 'wlew i.v. 2h', frequency: 'co 12h' }, 'MEROPENEM': { dose: '1g', route: 'wlew i.v. 30min', frequency: 'co 8h' }, 'METRONIDAZOL': { dose: '500mg', route: 'i.v.', frequency: 'co 8h' }, 'PIPERACYLINA/TAZOBAKTAM': { dose: '4.5g', route: 'wlew i.v. 30min', frequency: 'co 8h' }, 'SULBAKTAM/CEFOPERAZON': { dose: '2g', route: 'i.v.', frequency: 'co 12h' }, 'TEIKOPLANINA': { dose: 'nasyc. 400mg x3 co 12h, potem 400mg', route: 'i.v.', frequency: 'co 24h' }, 'TYGECYKLINA': { dose: 'nasyc. 100mg, potem 50mg', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'WANKOMYCYNA': { dose: '1g', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'FLUKONAZOL': { dose: '400mg', route: 'i.v.', frequency: 'co 24h' }, 'WORYKONAZOL': { dose: 'nasyc. 6mg/kg x2, potem 4mg/kg', route: 'wlew i.v. 2h', frequency: 'co 12h' }, 'GENTAMYCYNA': { dose: '3-5mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'KETOKONAZOL': { dose: '200mg', route: 'p.o. (sonda)', frequency: 'co 12h' }, 'FUROSEMID': { dose: '20-40mg', route: 'i.v.', frequency: 'wg zlecenia' }, 'MANNITOL 15%': { dose: '100ml', route: 'wlew i.v. 30min', frequency: 'wg zlecenia' }, 'SPIRONOLAKTON': { dose: '25-100mg', route: 'i.v.', frequency: 'co 24h' }, 'ENOKSAPARYNA': { dose: '40mg', route: 's.c.', frequency: 'co 24h' }, 'NADROPARYNA': { dose: '0.4-0.6ml', route: 's.c.', frequency: 'co 24h' }, 'KWAS TRANEXAMOWY': { dose: '1g', route: 'i.v.', frequency: 'co 8h' }, 'ETAMSYLAT': { dose: '250-500mg', route: 'i.v.', frequency: 'co 6h' }, 'DEKSAMETAZON': { dose: '4-8mg', route: 'i.v.', frequency: 'co 6-12h' }, 'HYDROKORTYZON': { dose: '50-100mg', route: 'i.v.', frequency: 'co 6-8h' }, 'METYLOPREDNIZOLON': { dose: '125mg', route: 'i.v.', frequency: 'wg zlecenia' }, 'METAMIZOL': { dose: '1g', route: 'i.v.', frequency: 'co 6-8h' }, 'PARACETAMOL': { dose: '1g', route: 'i.v.', frequency: 'co 6h' }, 'METOKLOPRAMID': { dose: '10mg', route: 'i.v.', frequency: 'co 8h' }, 'PANTOPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' }, 'OMEPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' }, 'HALOPERIDOL': { dose: '2.5-5mg', route: 'i.v./i.m.', frequency: 'wg zlecenia' }, 'CHLORPROMAZYNA': { dose: '25-50mg', route: 'i.m.', frequency: 'doraźnie' }, 'DESMOPRESYNA': { dose: '1-4μg', route: 'i.v./s.c.', frequency: 'co 12-24h' }, 'WAPŃ': { dose: '10-20ml 10%', route: 'i.v. wlew', frequency: 'co 6h' }, 'WINPOCETYNA': { dose: '10mg', route: 'i.v. wlew', frequency: 'co 12h' }, 'CEREBROLIZYNA': { dose: '10-30ml', route: 'i.v. wlew', frequency: 'co 24h' }, 'PIRACETAM': { dose: '4.8g', route: 'i.v.', frequency: 'co 12h' }, 'ORNITYNA': { dose: '20g', route: 'i.v. wlew 24h', frequency: 'co 24h' }, 'CYKLOFOSFAMID': { dose: 'wg zlecenia', route: 'i.v. wlew', frequency: 'wg schematu' }, 'ACETYLOCYSTEINA': { dose: '300mg (3ml)', route: 'nebulizacja', frequency: 'co 8h' }, 'ADRENALINA (NEBULIZACJA)': { dose: '0.5mg', route: 'nebulizacja', frequency: 'wg zlecenia' }, 'AMBROKSOL': { dose: '15mg (2ml)', route: 'nebulizacja', frequency: 'co 12h' }, 'BERODUAL': { dose: '1-2ml (20-40 kropli)', route: 'nebulizacja', frequency: 'co 4-6h' }, 'IPRATROPIUM': { dose: '0.5mg (2ml)', route: 'nebulizacja', frequency: 'co 6-8h' }, 'KOLISTYNA (NEBULIZACJA)': { dose: '1-2mln j', route: 'nebulizacja', frequency: 'co 8-12h' }, 'SALBUTAMOL (NEBULIZACJA)': { dose: '2.5mg', route: 'nebulizacja', frequency: 'co 4-6h' }, 'SALBUTAMOL (WZIEW)': { dose: '2 wdechy', route: 'do rurki', frequency: 'co 4h' }, 'NABIC (1.4% NAHCO3)': { dose: '5ml', route: 'nebulizacja', frequency: 'co 8h' }, 'LEWOFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 2h → co 6h' }, 'TOBRAMYCYNA/DEKSAMETAZON (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' }, 'OFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' }, 'POLPRAZOL': { dose: '20mg', route: 'p.o. (sonda)', frequency: 'co 12h' }, 'LACTULOSUM': { dose: '15ml', route: 'p.o. (sonda)', frequency: 'co 8h' }, 'KALIUM POLISTYRENOSULFONIAN': { dose: '15g (1 miarka)', route: 'p.o. (sonda)', frequency: 'co 6-8h' }, 'EUTHYROX': { dose: 'wg zlecenia', route: 'p.o. na czczo', frequency: 'co 24h' } };

const fluidsData = { 'NaCl 0.9%': { volume: '500ml', rate: '50' }, 'Plasmalyte': { volume: '500ml', rate: '50' }, 'Optilyte': { volume: '500ml', rate: '50' }, 'Płyn Ringera': { volume: '500ml', rate: '50' }, 'Glukoza 5%': { volume: '500ml', rate: '40' }, 'Glukoza 10%': { volume: '500ml', rate: '30' }, 'Gelofusine': { volume: '500ml', rate: '100' }, 'Albuminy 20%': { volume: '100ml', rate: '50' }, 'Albuminy 5%': { volume: '250ml', rate: '100' }, 'Mannitol 15%': { volume: '250ml', rate: '125' }, 'NaHCO3 8.4%': { volume: '100ml', rate: '50' } };

const glucoseKcalData = { "Glukoza 5%": 0.17, "Glukoza 10%": 0.34 };

// Domyślne przepływy dla preparatów żywieniowych (ml/h)
const nutritionFlowRates = {
    // Dojelitowe
    "Nutricomp Standard 500ml (1 kcal/ml)": 50, "Nutricomp Standard 1000ml (1 kcal/ml)": 80, 
    "Nutricomp intensiv 500ml (1.5 kcal/ml)": 40, "Nutricomp intensiv 1000ml (1.5 kcal/ml)": 60,
    "Nutricomp Standard Fibre 500ml (1 kcal/ml)": 50, "Nutrison 500ml (1 kcal/ml)": 50, 
    "Nutrison 1000ml (1 kcal/ml)": 80, "Nutrison 1500ml (1 kcal/ml)": 100, 
    "Nutrison Advanced Peptisorb 500ml (1 kcal/ml)": 50, "Nutrison Advanced Peptisorb 1000ml (1 kcal/ml)": 80,
    "Nutrison Multi Fibre 500ml (1 kcal/ml)": 50, "Nutrison Multi Fibre 1000ml (1 kcal/ml)": 80,
    
    // Pozajelitowe
    "OMEGAFLEX PLUS 1250ml (1.3 kcal/ml)": 50, "OMEGAFLEX PLUS 1875ml (1.3 kcal/ml)": 75,
    "OMEGAFLEX SPECIAL 625ml (1.3 kcal/ml)": 25, "OMEGAFLEX SPECIAL 1250ml (1.3 kcal/ml)": 50, 
    "OMEGAFLEX SPECIAL 1875ml (1.3 kcal/ml)": 75, "Nutriflex Peri 1000ml (1.2 kcal/ml)": 80,
    "Nutriflex Plus 1000ml (1.2 kcal/ml)": 80, "SmofKabiven 986ml (1.1 kcal/ml)": 40, 
    "SmofKabiven 1477ml (1.1 kcal/ml)": 60, "SmofKabiven Extra NITROGEN 1012ml (1.2 kcal/ml)": 42,
    "SmofKabiven Extra NITROGEN 1518ml (1.2 kcal/ml)": 63, "SmofKabiven EF 986ml (1.1 kcal/ml)": 40,
    "SmofKabiven EF 1477ml (1.1 kcal/ml)": 60, "SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)": 35,
    "SmofKabiven LOW OSMO 1400ml (1.0 kcal/ml)": 58, "SmofKabiven LOW OSMO 1950ml (1.0 kcal/ml)": 81,
    "Aminomix 1 Novum 1000ml (0.8 kcal/ml)": 80, "Aminomix 1 Novum 1500ml (0.8 kcal/ml)": 100
};

const nutritionData = { 
    // Dojelitowe
    "Nutricomp Standard 500ml (1 kcal/ml)": { kcal: 500, volume: 500 }, 
    "Nutricomp Standard 1000ml (1 kcal/ml)": { kcal: 1000, volume: 1000 },
    "Nutricomp intensiv 500ml (1.5 kcal/ml)": { kcal: 750, volume: 500 }, 
    "Nutricomp intensiv 1000ml (1.5 kcal/ml)": { kcal: 1500, volume: 1000 },
    "Nutricomp Standard Fibre 500ml (1 kcal/ml)": { kcal: 500, volume: 500 }, 
    "Nutrison 500ml (1 kcal/ml)": { kcal: 500, volume: 500 }, 
    "Nutrison 1000ml (1 kcal/ml)": { kcal: 1000, volume: 1000 }, 
    "Nutrison 1500ml (1 kcal/ml)": { kcal: 1500, volume: 1500 },
    "Nutrison Advanced Peptisorb 500ml (1 kcal/ml)": { kcal: 500, volume: 500 }, 
    "Nutrison Advanced Peptisorb 1000ml (1 kcal/ml)": { kcal: 1000, volume: 1000 },
    "Nutrison Multi Fibre 500ml (1 kcal/ml)": { kcal: 500, volume: 500 }, 
    "Nutrison Multi Fibre 1000ml (1 kcal/ml)": { kcal: 1000, volume: 1000 },
    
    // Pozajelitowe
    "OMEGAFLEX PLUS 1250ml (1.3 kcal/ml)": { kcal: 1625, volume: 1250 }, 
    "OMEGAFLEX PLUS 1875ml (1.3 kcal/ml)": { kcal: 2438, volume: 1875 },
    "OMEGAFLEX SPECIAL 625ml (1.3 kcal/ml)": { kcal: 813, volume: 625 }, 
    "OMEGAFLEX SPECIAL 1250ml (1.3 kcal/ml)": { kcal: 1625, volume: 1250 }, 
    "OMEGAFLEX SPECIAL 1875ml (1.3 kcal/ml)": { kcal: 2438, volume: 1875 },
    "Nutriflex Peri 1000ml (1.2 kcal/ml)": { kcal: 1200, volume: 1000 }, 
    "Nutriflex Plus 1000ml (1.2 kcal/ml)": { kcal: 1200, volume: 1000 },
    "SmofKabiven 986ml (1.1 kcal/ml)": { kcal: 1085, volume: 986 }, 
    "SmofKabiven 1477ml (1.1 kcal/ml)": { kcal: 1625, volume: 1477 },
    "SmofKabiven Extra NITROGEN 1012ml (1.2 kcal/ml)": { kcal: 1214, volume: 1012 }, 
    "SmofKabiven Extra NITROGEN 1518ml (1.2 kcal/ml)": { kcal: 1822, volume: 1518 },
    "SmofKabiven EF 986ml (1.1 kcal/ml)": { kcal: 1085, volume: 986 }, 
    "SmofKabiven EF 1477ml (1.1 kcal/ml)": { kcal: 1625, volume: 1477 },
    "SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)": { kcal: 850, volume: 850 }, 
    "SmofKabiven LOW OSMO 1400ml (1.0 kcal/ml)": { kcal: 1400, volume: 1400 }, 
    "SmofKabiven LOW OSMO 1950ml (1.0 kcal/ml)": { kcal: 1950, volume: 1950 },
    "Aminomix 1 Novum 1000ml (0.8 kcal/ml)": { kcal: 800, volume: 1000 }, 
    "Aminomix 1 Novum 1500ml (0.8 kcal/ml)": { kcal: 1200, volume: 1500 }
};

const gfrDoseAdjustments = {
    'WANKOMYCYNA': [
        { gfrMax: 10, dose: '1g nasyc., potem 0.5g', frequency: 'co 72h + TDM' },
        { gfrMax: 50, dose: '1g', frequency: 'co 48h + TDM' }
    ],
    'MEROPENEM': [
        { gfrMax: 10, dose: '0.5g', frequency: 'co 24h' },
        { gfrMax: 25, dose: '0.5g', frequency: 'co 12h' },
        { gfrMax: 50, dose: '1g', frequency: 'co 12h' }
    ],
    'PIPERACYLINA/TAZOBAKTAM': [
        { gfrMax: 20, dose: '2.25g', frequency: 'co 8h' },
        { gfrMax: 40, dose: '3.375g', frequency: 'co 8h' }
    ],
    'AMIKACYNA': [
        { gfrMax: 10, dose: '7.5mg/kg', frequency: 'co 72h + TDM' },
        { gfrMax: 50, dose: '15mg/kg', frequency: 'co 36h + TDM' }
    ],
    'GENTAMYCYNA': [
        { gfrMax: 10, dose: '1-2mg/kg', frequency: 'co 72h + TDM' },
        { gfrMax: 50, dose: '3-5mg/kg', frequency: 'co 36h + TDM' }
    ],
    'LEWOFLOKSACYNA': [
        { gfrMax: 50, dose: '500mg x1, potem 250mg', frequency: 'co 48h' }
    ],
    'FLUKONAZOL': [
        { gfrMax: 50, dose: 'nasyc. 400mg, potem 200mg', frequency: 'co 24h' }
    ],
    'ENOKSAPARYNA': [
        { gfrMax: 15, dose: 'Przeciwwskazana', frequency: ''},
        { gfrMax: 30, dose: '20mg', frequency: 'co 24h' }
    ]
};

// --- FUNKCJE POMOCNICZE ---
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto'; // Resetuj wysokość
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Ustaw wysokość na wysokość zawartości
}

// --- GŁÓWNE FUNKCJE ---
function removeRow(button) { 
    button.closest('tr').remove(); 
    updateSummaries(); 
}
function updateSummaries() { 
    let totalFluids = 0; 
    let totalKcal = 0; 
    
    // Płyny z tabeli fluids
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => { 
        const rateInput = row.querySelector('.fluid-rate'); 
        if (rateInput && rateInput.value) { 
            const rate = parseFloat(rateInput.value.replace(',', '.')); 
            if (!isNaN(rate)) { 
                totalFluids += rate * 24; 
            } 
        } 
        const nameInput = row.querySelector('.fluid-name'); 
        if(nameInput && glucoseKcalData[nameInput.value]) { 
            const rate = parseFloat(rateInput.value.replace(',', '.')); 
            if (!isNaN(rate)) { 
                totalKcal += (rate * 24) * glucoseKcalData[nameInput.value]; 
            } 
        } 
    }); 
    
    // Żywienie z tabeli nutrition
    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => { 
        const prepInput = row.querySelector('.nutrition-prep'); 
        const rateInput = row.querySelector('.nutrition-rate');
        
        if (prepInput && prepInput.value && rateInput && rateInput.value) {
            const rate = parseFloat(rateInput.value.replace(',', '.'));
            const productInfo = nutritionData[prepInput.value];
            
            if (productInfo && !isNaN(rate) && rate > 0) {
                const hoursToInfuse = productInfo.volume / rate;
                const kcalPerHour = productInfo.kcal / hoursToInfuse;
                const fluidPerHour = rate;
                
                totalFluids += fluidPerHour * 24;
                totalKcal += kcalPerHour * 24;
            }
        } else if (prepInput && prepInput.value) {
            const productInfo = nutritionData[prepInput.value];
            if (productInfo) { 
                totalFluids += productInfo.volume; 
                totalKcal += productInfo.kcal; 
            } 
        }
    }); 
    
    document.getElementById('totalFluids').textContent = totalFluids.toFixed(0); 
    document.getElementById('totalKcal').textContent = totalKcal.toFixed(0); 
}
function calculateInfusionRate(inputElement) { const row = inputElement.closest('tr'); if (!row) return; const weightInput = document.getElementById('patientWeight'); const weight = parseFloat(weightInput.value); const doseInput = row.querySelector('.dose'); const concentrationInput = row.querySelector('input[id$="_conc"]'); const rateOutput = row.querySelector('.infusion-rate'); if (!weight || weight <= 0 || !doseInput.value || !concentrationInput.value) { return; } let doseStr = doseInput.value.replace(',', '.'); let concStr = concentrationInput.value.replace(',', '.'); const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?.*?(μg|mcg|mg|j)\s*(\/kg)?\s*\/(min|h)/; const doseMatch = doseStr.match(doseRegex); if (!doseMatch) { rateOutput.value = ''; return; } let doseValue1 = parseFloat(doseMatch[1]); let doseValue2 = doseMatch[2] ? parseFloat(doseMatch[2]) : null; let doseUnit = doseMatch[3]; const perKg = doseMatch[4]; const perTime = doseMatch[5]; const concRegex = /([\d\.]+)\s*(mg|μg|mcg|j)\s*\/(?:([\d\.]+)\s*)?ml/; const concMatch = concStr.match(concRegex); let concentrationPerMl; if (concMatch) { let totalMass = parseFloat(concMatch[1]); const massUnit = concMatch[2]; const totalVolume = concMatch[3] ? parseFloat(concMatch[3]) : 1; if (massUnit === 'mg') totalMass *= 1000; concentrationPerMl = totalMass / totalVolume; } else { rateOutput.value = ''; return; } if (concentrationPerMl === 0) return; if (doseUnit === 'mg') { doseValue1 *= 1000; if(doseValue2) doseValue2 *= 1000; } const calculateRate = (dose) => { let totalDosePerTime = dose; if (perKg) totalDosePerTime *= weight; const volumePerTime = totalDosePerTime / concentrationPerMl; return (perTime === 'min') ? volumePerTime * 60 : volumePerTime; }; const finalRate1 = calculateRate(doseValue1); if (doseValue2) { const finalRate2 = calculateRate(doseValue2); rateOutput.value = `${finalRate1.toFixed(1).replace('.', ',')} - ${finalRate2.toFixed(1).replace('.', ',')}`; } else { rateOutput.value = finalRate1.toFixed(1).replace('.', ','); } }
function calculateIcuDay() { const admissionDateStr = document.getElementById('admissionDateInput').value; const mainDateStr = document.getElementById('mainDateInput').value; const icuDayInput = document.getElementById('icuDayInput'); const parseDate = (dateStr) => { const parts = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (!parts) return null; return new Date(parts[3], parts[2] - 1, parts[1]); }; const admissionDate = parseDate(admissionDateStr); const mainDate = parseDate(mainDateStr); if (admissionDate && mainDate && mainDate >= admissionDate) { const utcMain = Date.UTC(mainDate.getFullYear(), mainDate.getMonth(), mainDate.getDate()); const utcAdmission = Date.UTC(admissionDate.getFullYear(), admissionDate.getMonth(), admissionDate.getDate()); const dayInMillis = 1000 * 60 * 60 * 24; const diffDays = (utcMain - utcAdmission) / dayInMillis; icuDayInput.value = Math.round(diffDays) + 1; } else { icuDayInput.value = ''; } }
function calculateBMI() { const weightInput = document.getElementById('patientWeight'); const heightInput = document.getElementById('heightInput'); const bmiOutput = document.getElementById('bmiOutput'); const weight = parseFloat(weightInput.value); const height = parseFloat(heightInput.value); if (weight > 0 && height > 0) { const heightInMeters = height / 100; const bmi = weight / (heightInMeters * heightInMeters); bmiOutput.value = bmi.toFixed(1); } else { bmiOutput.value = ''; } }
function handleWeightHeightChange() { calculateBMI(); document.querySelectorAll('#continuousDrugsTbody tr').forEach(row => { const doseInput = row.querySelector('.dose'); if (doseInput) calculateInfusionRate(doseInput); }); recalculateAllKgDoses(); }

function addContinuousDrug() { const tbody = document.querySelector('#continuousDrugsTbody'); const newRow = document.createElement('tr'); const rowId = 'cont_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="continuousDrugsList" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input" placeholder="Stężenie" id="${rowId}_conc" oninput="calculateInfusionRate(this.closest('tr').querySelector('.dose'))" /></td><td><input type="text" class="drug-input dose" placeholder="Dawka" id="${rowId}_dose" oninput="calculateInfusionRate(this)" /></td><td><input type="text" class="drug-input infusion-rate" placeholder="0,0" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; tbody.appendChild(newRow); }
function fillContinuousDrugData(input, rowId) { const drugName = input.value.toUpperCase(); if (continuousDrugsData[drugName]) { const data = continuousDrugsData[drugName]; const concInput = document.getElementById(rowId + '_conc'); const doseInput = document.getElementById(rowId + '_dose'); const row = input.closest('tr'); const rateOutput = row.querySelector('.infusion-rate'); concInput.value = data.concentration; doseInput.value = data.dose; if (data.fixedRate) { rateOutput.value = data.fixedRate; } else { calculateInfusionRate(doseInput); } } }

function addPeriodicDrug() { const tbody = document.querySelector('#periodicDrugsTbody'); const newRow = document.createElement('tr'); const rowId = 'per_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="periodicDrugsList" onchange="fillPeriodicDrugData(this)" id="${rowId}_name" /><input type="text" class="drug-input" placeholder="Dawka" id="${rowId}_dose" /></td><td><input type="text" class="drug-input" placeholder="i.v." id="${rowId}_route" /><input type="text" class="drug-input" placeholder="co 24h" id="${rowId}_freq" /><span class="dose-reduction-notice" style="display:none;">⚠️ Zredukowano</span></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; tbody.appendChild(newRow); }

function fillPeriodicDrugData(input) { 
    const row = input.closest('tr'); 
    const drugName = input.value.toUpperCase(); 
    const doseInput = row.querySelector('input[id$="_dose"]'); 
    const routeInput = row.querySelector('input[id$="_route"]'); 
    const freqInput = row.querySelector('input[id$="_freq"]'); 
    const originalData = periodicDrugsData[drugName]; 
    if (originalData) { 
        doseInput.dataset.originalDose = originalData.dose; 
        routeInput.value = originalData.route; 
        routeInput.placeholder = '';
        freqInput.value = originalData.frequency; 
        freqInput.placeholder = '';
    } else { 
        doseInput.dataset.originalDose = ''; 
        routeInput.placeholder = 'i.v.';
        freqInput.placeholder = 'co 24h';
    } 
    recalculateDose(row); 
    adjustSingleDoseForGfr(row); 
}

function addFluid() { const tbody = document.querySelector('#fluidsTable tbody'); const newRow = document.createElement('tr'); const rowId = 'fluid_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input fluid-name" placeholder="Płyn" list="fluidsList" onchange="fillFluidData(this, '${rowId}')" /></td><td><input type="text" class="drug-input additives-input" placeholder="np. + KCl 15% 10ml | + MgSO4 20% 5ml" /></td><td><input type="number" class="drug-input" placeholder="ml" id="${rowId}_vol" oninput="updateSummaries()" /></td><td><input type="number" class="drug-input fluid-rate" placeholder="ml/h" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; tbody.appendChild(newRow); }
function fillFluidData(input, rowId) { const fluidName = input.value; if (fluidsData[fluidName]) { document.getElementById(rowId + '_vol').value = fluidsData[fluidName].volume.replace('ml',''); document.getElementById(rowId + '_rate').value = fluidsData[fluidName].rate; updateSummaries(); } }

function addNutrition() { 
    const tbody = document.querySelector('#nutritionTable tbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'nutr_' + Date.now();
    newRow.innerHTML = `<td><input type="text" class="drug-input nutrition-type" placeholder="Wybierz typ..." list="nutritionTypesList" onchange="updateNutritionProductList(this)" /></td><td><input type="text" class="drug-input nutrition-prep" placeholder="Wybierz preparat..." list="enteralProductsList" onchange="fillNutritionData(this, '${rowId}')" id="${rowId}_prep"/><textarea class="drug-input nutrition-additives" placeholder="" id="${rowId}_additives" style="display:none;" rows="1"></textarea></td><td><input type="number" class="drug-input nutrition-rate" placeholder="ml/h" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    
    const newTextarea = newRow.querySelector('.nutrition-additives');
    newTextarea.addEventListener('input', () => autoResizeTextarea(newTextarea));
}

function fillNutritionData(input, rowId) {
    const prepName = input.value;
    const rateInput = document.getElementById(rowId + '_rate');
    const additivesTextarea = document.getElementById(rowId + '_additives');
    const row = input.closest('tr');
    const typeInput = row.querySelector('.nutrition-type');
    const typeValue = typeInput ? typeInput.value.toLowerCase() : '';
    
    if (nutritionFlowRates[prepName] && !rateInput.value) {
        rateInput.value = nutritionFlowRates[prepName];
    }
    
    if (typeValue.includes('pozajelitowe') && additivesTextarea) {
        if (prepName.includes('SmofKabiven') || prepName.includes('OMEGAFLEX') || prepName.includes('Nutriflex') || prepName.includes('Aminomix')) {
            if (!additivesTextarea.value) {
                additivesTextarea.value = '+ Glycophos 3ml + Supliven 10ml + Omegaven 50ml + Soluvit N 1amp + Vitalipid 10ml';
                autoResizeTextarea(additivesTextarea); // Zmień rozmiar po auto-uzupełnieniu
            }
        }
    }
    
    updateSummaries();
}
function updateNutritionProductList(typeInput) { 
    const row = typeInput.closest('tr'); 
    const prepInput = row.querySelector('.nutrition-prep'); 
    const additivesInput = row.querySelector('.nutrition-additives');
    const typeValue = typeInput.value.toLowerCase(); 
    
    let newListId = 'enteralProductsList';
    if (typeValue.includes('dojelitowe')) { 
        newListId = 'enteralProductsList';
        if (additivesInput) {
            additivesInput.style.display = 'none';
            additivesInput.value = '';
        }
    } else if (typeValue.includes('pozajelitowe')) { 
        newListId = 'parenteralProductsList';
        if (additivesInput) {
            additivesInput.style.display = 'block';
            additivesInput.placeholder = 'np. + Glycophos 3ml + Supliven 10ml...';
        }
    } else { 
        if (additivesInput) {
            additivesInput.style.display = 'none';
            additivesInput.value = '';
        }
    } 
    
    prepInput.setAttribute('list', newListId);
    prepInput.value = ''; 
    
    setTimeout(() => {
        prepInput.focus();
    }, 0);

    updateSummaries(); 
}

function addProcedure() { const tbody = document.querySelector('#proceduresTable tbody'); const newRow = document.createElement('tr'); newRow.innerHTML = `<td><input type="text" class="drug-input" placeholder="Godz." list="timesList" /></td><td><input type="text" class="drug-input" placeholder="Nazwa procedury/zabiegu" list="proceduresList" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; tbody.appendChild(newRow); }

// --- LOGIKA DAWKOWANIA (GFR, mg/kg) ---
function recalculateDose(row) { const doseInput = row.querySelector('input[id$="_dose"]'); const originalDose = doseInput.dataset.originalDose; const weight = parseFloat(document.getElementById('patientWeight').value); if (originalDose && originalDose.includes('/kg') && weight > 0) { const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?/; const matches = originalDose.match(doseRegex); if (matches) { const dose1 = parseFloat(matches[1]); const totalDose1 = Math.round(dose1 * weight); if (matches[2]) { const dose2 = parseFloat(matches[2]); const totalDose2 = Math.round(dose2 * weight); doseInput.value = `${totalDose1}-${totalDose2}mg (${originalDose})`; } else { doseInput.value = `${totalDose1}mg (${originalDose})`; } } } else if (originalDose) { doseInput.value = originalDose; } }
function recalculateAllKgDoses(){ document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => recalculateDose(row)); adjustAllDosesForGfr(); }
function adjustAllDosesForGfr() { document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => adjustSingleDoseForGfr(row)); }
function adjustSingleDoseForGfr(row) {
    const gfrInput = document.getElementById('gfrInput');
    const gfr = gfrInput.value ? parseFloat(gfrInput.value) : null;
    const drugNameInput = row.querySelector('.drug-name');
    if (!drugNameInput || !drugNameInput.value) return;

    const drugName = drugNameInput.value.toUpperCase();
    const doseInput = row.querySelector('input[id$="_dose"]');
    const freqInput = row.querySelector('input[id$="_freq"]');
    const notice = row.querySelector('.dose-reduction-notice');
    const adjustmentRules = gfrDoseAdjustments[drugName];

    recalculateDose(row);
    row.classList.remove('gfr-dose-adjusted');
    if (notice) notice.style.display = 'none';

    if (!gfr || !adjustmentRules) return;

    let appliedRule = null;
    for (const rule of adjustmentRules) { if (gfr <= rule.gfrMax) { appliedRule = rule; break; } }

    if (appliedRule) {
        if (appliedRule.dose.includes('/kg')) {
            const weight = parseFloat(document.getElementById('patientWeight').value);
            if (weight > 0) {
                const doseRegex = /([\d\.]+)/; const matches = appliedRule.dose.match(doseRegex);
                if(matches) { const totalDose = Math.round(parseFloat(matches[1]) * weight); doseInput.value = `${totalDose}mg (${appliedRule.dose})`; }
            } else { doseInput.value = appliedRule.dose; }
        } else { doseInput.value = appliedRule.dose; }
        if (appliedRule.frequency && freqInput) freqInput.value = appliedRule.frequency;
        row.classList.add('gfr-dose-adjusted');
        if (notice) notice.style.display = 'inline';
    }
}

function populateDatalists() {
    const createOptions = (dataObject) => Object.keys(dataObject).map(key => `<option value="${key}"></option>`).join('');
    document.getElementById('continuousDrugsList').innerHTML = createOptions(continuousDrugsData);
    document.getElementById('periodicDrugsList').innerHTML = createOptions(periodicDrugsData);
    document.getElementById('fluidsList').innerHTML = createOptions(fluidsData);
    
    const enteral = {};
    const parenteral = {};
    Object.keys(nutritionData).forEach(key => {
        if (key.includes('OMEGAFLEX') || key.includes('Nutriflex') || key.includes('SmofKabiven') || key.includes('Aminomix')) {
            parenteral[key] = nutritionData[key];
        } else {
            enteral[key] = nutritionData[key];
        }
    });
    
    document.getElementById('enteralProductsList').innerHTML = createOptions(enteral);
    document.getElementById('parenteralProductsList').innerHTML = createOptions(parenteral);
}

function initializeCard() { 
    const today = new Date(); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear(); 
    document.getElementById('mainDateInput').value = `${day}.${month}.${year}`; 
    calculateIcuDay(); 
    calculateBMI(); 
}
document.addEventListener('DOMContentLoaded', () => { 
    populateDatalists();
    const toggle = document.getElementById('darkModeToggle'); 
    const html = document.documentElement; 
    const icon = toggle.querySelector('i'); 
    if (localStorage.getItem('darkMode') === 'enabled') { 
        html.classList.add('dark-mode'); 
        icon.className = 'fas fa-sun'; 
    } 
    toggle.addEventListener('click', () => { 
        html.classList.toggle('dark-mode'); 
        if (html.classList.contains('dark-mode')) { 
            localStorage.setItem('darkMode', 'enabled'); 
            icon.className = 'fas fa-sun'; 
        } else { 
            localStorage.setItem('darkMode', 'disabled'); 
            icon.className = 'fas fa-moon'; 
        } 
    }); 
    initializeCard(); 
    
    const roomInput = document.getElementById('roomInput');
    const roomInputPrint = document.getElementById('roomInputPrint');
    if (roomInput && roomInputPrint) {
        roomInput.addEventListener('input', function() {
            roomInputPrint.value = this.value;
        });
    }
});

// --- LOGIKA ZAPISU I WCZYTYWANIA ---
function getCardState() {
    const cardState = {
        header: {},
        tables: {
            continuous: [],
            periodic: [],
            fluids: [],
            nutrition: [],
            procedures: []
        },
        notes: ''
    };
    document.querySelectorAll('.header-input').forEach(input => {
        if (input.id) cardState.header[input.id] = input.value;
    });
    document.querySelectorAll('#continuousDrugsTbody tr').forEach(row => {
        cardState.tables.continuous.push({
            name: row.cells[0].querySelectorAll('input')[0].value,
            conc: row.cells[0].querySelectorAll('input')[1].value,
            dose: row.cells[1].querySelector('input').value,
            rate: row.cells[2].querySelector('input').value
        });
    });
    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => {
        cardState.tables.periodic.push({
            name: row.cells[0].querySelectorAll('input')[0].value,
            dose: row.cells[0].querySelectorAll('input')[1].value,
            route: row.cells[1].querySelectorAll('input')[0].value,
            freq: row.cells[1].querySelectorAll('input')[1].value
        });
    });
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        cardState.tables.fluids.push({
            name: row.cells[0].querySelector('input').value,
            additives: row.cells[1].querySelector('input').value,
            volume: row.cells[2].querySelector('input').value,
            rate: row.cells[3].querySelector('input').value
        });
    });
    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => {
        cardState.tables.nutrition.push({
            type: row.cells[0].querySelector('input').value,
            prep: row.cells[1].querySelector('input').value,
            additives: row.cells[1].querySelector('textarea').value,
            rate: row.cells[2].querySelector('input').value
        });
    });
    document.querySelectorAll('#proceduresTable tbody tr').forEach(row => {
        cardState.tables.procedures.push({
            time: row.cells[0].querySelector('input').value,
            name: row.cells[1].querySelector('input').value
        });
    });
    cardState.notes = document.querySelector('.notes-section textarea').value;
    return cardState;
}

function saveCard() {
    const patientName = document.getElementById('patientNameInput').value.trim();
    const historyNumber = document.getElementById('historyNumberInput').value.trim();
    if (!patientName || !historyNumber) {
        alert("Proszę wypełnić Imię i Nazwisko oraz Numer Historii, aby zapisać kartę.");
        return;
    }
    const cardKey = `card_${patientName.replace(/\s+/g, '-')}_${historyNumber.replace(/[\/\s]+/g, '-')}`;
    
    const cardState = getCardState();

    try {
        localStorage.setItem(cardKey, JSON.stringify(cardState));
        let savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex')) || [];
        if (!savedCardsIndex.includes(cardKey)) {
            savedCardsIndex.push(cardKey);
            localStorage.setItem('savedCardsIndex', JSON.stringify(savedCardsIndex));
        }
        alert('✅ Karta została pomyślnie zapisana w przeglądarce!');
    } catch (e) {
        console.error("Błąd zapisu:", e);
        alert('❌ Wystąpił błąd podczas zapisu karty.');
    }
}

function openLoadModal() {
    const savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex')) || [];
    const listElement = document.getElementById('savedCardsList');
    listElement.innerHTML = '';
    if (savedCardsIndex.length === 0) {
        listElement.innerHTML = '<li>Brak zapisanych kart.</li>';
    } else {
        savedCardsIndex.forEach(key => {
            const friendlyName = key.replace('card_', '').replace(/_/g, ' ');
            const li = document.createElement('li');
            li.innerHTML = `<span class="patient-name">${friendlyName}</span>
                            <div>
                                <button class="control-button load small" onclick="loadCard('${key}')">Wczytaj</button>
                                <button class="control-button clear small" onclick="deleteCard('${key}', this)">Usuń</button>
                            </div>`;
            listElement.appendChild(li);
        });
    }
    document.getElementById('loadCardModal').style.display = 'flex';
}

function deleteCard(cardKey, button) {
    if (confirm(`Czy na pewno chcesz usunąć kartę: ${cardKey.replace('card_', '').replace(/_/g, ' ')}?`)) {
        localStorage.removeItem(cardKey);
        let savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex')) || [];
        savedCardsIndex = savedCardsIndex.filter(key => key !== cardKey);
        localStorage.setItem('savedCardsIndex', JSON.stringify(savedCardsIndex));
        button.closest('li').remove();
    }
}

function loadCard(cardKey) {
    const savedStateJSON = localStorage.getItem(cardKey);
    if (!savedStateJSON) {
        alert('📂 Nie można wczytać karty. Mogła zostać usunięta.');
        return;
    }
    const cardState = JSON.parse(savedStateJSON);
    populateCardFromState(cardState);
    closeModal('loadCardModal');
}

function populateCardFromState(cardState) {
    clearCard(true);
    Object.keys(cardState.header).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = cardState.header[id];
    });
    
    const roomInput = document.getElementById('roomInput');
    const roomInputPrint = document.getElementById('roomInputPrint');
    if (roomInput && roomInputPrint && roomInput.value) {
        roomInputPrint.value = roomInput.value;
    }
    
    cardState.tables.continuous.forEach(data => {
        addContinuousDrug();
        const newRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        newRow.cells[0].querySelectorAll('input')[0].value = data.name;
        newRow.cells[0].querySelectorAll('input')[1].value = data.conc;
        newRow.cells[1].querySelector('input').value = data.dose;
        newRow.cells[2].querySelector('input').value = data.rate;
    });
    cardState.tables.periodic.forEach(data => {
        addPeriodicDrug();
        const newRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const drugInput = newRow.cells[0].querySelectorAll('input')[0];
        drugInput.value = data.name;
        fillPeriodicDrugData(drugInput);
        newRow.cells[0].querySelectorAll('input')[1].value = data.dose;
        newRow.cells[1].querySelectorAll('input')[0].value = data.route;
        newRow.cells[1].querySelectorAll('input')[1].value = data.freq;
    });
    cardState.tables.fluids.forEach(data => {
        addFluid();
        const newRow = document.querySelector('#fluidsTable tbody tr:last-child');
        newRow.cells[0].querySelector('input').value = data.name;
        
        if (data.additives) {
            if (data.additives.startsWith('[')) {
                try {
                    const additives = JSON.parse(data.additives);
                    const displayText = additives.map(ad => `+ ${ad.name} ${ad.volume}ml`).join(' | ');
                    newRow.cells[1].querySelector('input').value = displayText;
                } catch (e) {
                    newRow.cells[1].querySelector('input').value = data.additives;
                }
            } else {
                newRow.cells[1].querySelector('input').value = data.additives;
            }
        }
        
        newRow.cells[2].querySelector('input').value = data.volume;
        newRow.cells[3].querySelector('input').value = data.rate;
    });
    cardState.tables.nutrition.forEach(data => {
        addNutrition();
        const newRow = document.querySelector('#nutritionTable tbody tr:last-child');
        const typeInput = newRow.cells[0].querySelector('input');
        const prepInput = newRow.cells[1].querySelector('input');
        const additivesTextarea = newRow.cells[1].querySelector('textarea');
        const rateInput = newRow.cells[2].querySelector('input');
        
        typeInput.value = data.type || '';
        if (data.type) {
            updateNutritionProductList(typeInput);
        }
        prepInput.value = data.prep || '';
        if(data.additives) {
            additivesTextarea.value = data.additives;
            autoResizeTextarea(additivesTextarea); // Zmień rozmiar po wczytaniu
        }
        if (data.rate) {
            rateInput.value = data.rate;
        }
    });
    cardState.tables.procedures.forEach(data => {
        addProcedure();
        const newRow = document.querySelector('#proceduresTable tbody tr:last-child');
        newRow.cells[0].querySelector('input').value = data.time;
        newRow.cells[1].querySelector('input').value = data.name;
    });
    document.querySelector('.notes-section textarea').value = cardState.notes;
    handleWeightHeightChange();
    updateSummaries();
    adjustAllDosesForGfr();
    alert('✅ Karta została wczytana!');
}

function clearCard(force = false) { 
    if (force || confirm('Czy na pewno chcesz wyczyścić całą kartę?')) { 
        document.querySelectorAll('input, textarea').forEach(input => { 
            if(!input.closest('.no-clear') && input.id !== 'roomInputPrint') {
                input.value = ''; 
            }
        }); 
        const roomInputPrint = document.getElementById('roomInputPrint');
        if (roomInputPrint) roomInputPrint.value = '';
        
        document.querySelectorAll('tbody').forEach(tbody => { 
            tbody.innerHTML = ''; 
        }); 
        updateSummaries(); 
        initializeCard(); 
        if (!force) alert('Karta została wyczyszczona!'); 
    } 
}

function generatePDF() {
    const element = document.getElementById('card-container');
    const patientName = document.getElementById('patientNameInput').value.trim() || 'Pacjent';
    const date = document.getElementById('mainDateInput').value || 'aktualna_data';
    const filename = `Karta_OIT_${patientName.replace(/\s+/g, '_')}_${date.replace(/\./g, '-')}.pdf`;
    const opt = { margin: 10, filename: filename, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(element).save();
}

function closeModal(modalId) { 
    document.getElementById(modalId).style.display = 'none'; 
}

// --- ZAPIS/ODCZYT Z PLIKU ---
function saveCardToFile() {
    const patientName = document.getElementById('patientNameInput').value.trim() || 'Pacjent';
    const historyNumber = document.getElementById('historyNumberInput').value.trim() || 'XXXX';
    const filename = `KartaOIT_${patientName.replace(/\s+/g, '_')}_${historyNumber.replace(/[\/\s]+/g, '-')}.json`;

    const cardState = getCardState();
    const fileContent = JSON.stringify(cardState, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function loadCardFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const cardState = JSON.parse(e.target.result);
            if (cardState.header && cardState.tables) {
                if (confirm('Czy na pewno chcesz wczytać dane z pliku? Obecne dane zostaną nadpisane.')) {
                    populateCardFromState(cardState);
                }
            } else {
                alert('Błąd: Wybrany plik ma nieprawidłową strukturę.');
            }
        } catch (error) {
            alert('Błąd: Nie można odczytać pliku. Upewnij się, że to prawidłowy plik zapisu (.json).');
            console.error("Błąd parsowania pliku JSON:", error);
        }
    };
    reader.onerror = function() {
        alert('Wystąpił błąd podczas odczytu pliku.');
    };
    reader.readAsText(file);
    event.target.value = '';
}
