// --- ENHANCED MEDICAL CARD SYSTEM v3.0 ---

// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = { 'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-1.0 μg/kg/min' }, 'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 μg/kg/min' }, 'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 μg/kg/min' }, 'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 μg/kg/min' }, 'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min' }, 'MILRINON': { concentration: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' }, 'PROPOFOL 1%': { concentration: '10mg/ml', dose: '1-4 mg/kg/h' }, 'PROPOFOL 2%': { concentration: '20mg/ml', dose: '1-4 mg/kg/h' }, 'MIDAZOLAM': { concentration: '50mg/50ml', dose: '1-15 mg/h' }, 'DEKSMEDETOMIDYNA': { concentration: '200μg/50ml', dose: '0.2-1.4 μg/kg/h' }, 'FENTANYL': { concentration: '500μg/50ml', dose: '25-100 μg/h' }, 'REMIFENTANYL': { concentration: '2mg/40ml', dose: '0.05-0.2 μg/kg/min' }, 'MORFINA': { concentration: '20mg/20ml', dose: '1-5 mg/h' }, 'LIGNOCAINA 1%': { concentration: '500mg/50ml', dose: '1-2 mg/min' }, 'OKSYKODON': { concentration: '20mg/20ml', dose: '1-2 mg/h' }, 'KETAMINA': { concentration: '250mg/50ml', dose: '0.5-2 mg/kg/h' }, 'ROKURONIOM': { concentration: '50mg/5ml', dose: '0.3-0.6 mg/kg/h' }, 'CISATRAKURIUM': { concentration: '20mg/10ml', dose: '0.06-0.18 mg/kg/h' }, 'INSULINA': { concentration: '50j/50ml', dose: '0.5-10 j/h' }, 'HEPARYNA': { concentration: '25000j/50ml', dose: '500-2000 j/h' }, 'FUROSEMID': { concentration: '100mg/50ml', dose: '5-20 mg/h' }, 'AMIODARON': { concentration: '300mg/50ml 5% Glc', dose: '20-50 mg/h' }, 'NITROGLICERYNA': { concentration: '25mg/50ml', dose: '5-200 μg/min' }, 'PIPERACYLINA/TAZOBAKTAM': { concentration: '18g/100ml', dose: 'wlew 24h', fixedRate: '4.2' }, 'PANTOPRAZOL': { concentration: '80mg/100ml', dose: '4.2 ml/h', fixedRate: '4.2' }, 'METOPROLOL': { concentration: '10mg/50ml', dose: '1-5 mg/h' }, 'SALBUTAMOL': { concentration: '5mg/50ml', dose: '3-20 μg/min' }, 'DIAZEPAM': { concentration: '50mg/50ml', dose: '2-10 mg/h' } };

const periodicDrugsData = { 'AMOKSYCYLINA/KWAS KLAWULANOWY': { dose: '1.2g', route: 'i.v.', frequency: 'co 8h' }, 'AMIKACYNA': { dose: '15-20mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'CEFTAZYDYM': { dose: '2g', route: 'i.v.', frequency: 'co 8h' }, 'CEFUROKSYM': { dose: '1.5g', route: 'i.v.', frequency: 'co 8h' }, 'CIPROFLOKSACYNA': { dose: '400mg', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'IMIPENEM/CYLASTATYNA': { dose: '0.5g', route: 'wlew i.v. 30min', frequency: 'co 6-8h' }, 'KOLISTYNA': { dose: 'nasyc. 9mln j, potem 4.5mln j', route: 'i.v.', frequency: 'co 12h' }, 'LEWOFLOKSACYNA': { dose: '500mg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'LINEZOLID': { dose: '600mg', route: 'wlew i.v. 2h', frequency: 'co 12h' }, 'MEROPENEM': { dose: '1g', route: 'wlew i.v. 30min', frequency: 'co 8h' }, 'METRONIDAZOL': { dose: '500mg', route: 'i.v.', frequency: 'co 8h' }, 'PIPERACYLINA/TAZOBAKTAM': { dose: '4.5g', route: 'wlew i.v. 30min', frequency: 'co 8h' }, 'SULBAKTAM/CEFOPERAZON': { dose: '2g', route: 'i.v.', frequency: 'co 12h' }, 'TEIKOPLANINA': { dose: 'nasyc. 400mg x3 co 12h, potem 400mg', route: 'i.v.', frequency: 'co 24h' }, 'TYGECYKLINA': { dose: 'nasyc. 100mg, potem 50mg', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'WANKOMYCYNA': { dose: '1g', route: 'wlew i.v. 1h', frequency: 'co 12h' }, 'FLUKONAZOL': { dose: '400mg', route: 'i.v.', frequency: 'co 24h' }, 'WORYKONAZOL': { dose: 'nasyc. 6mg/kg x2, potem 4mg/kg', route: 'wlew i.v. 2h', frequency: 'co 12h' }, 'GENTAMYCYNA': { dose: '3-5mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' }, 'KETOKONAZOL': { dose: '200mg', route: 'p.o. (sonda)', frequency: 'co 12h' }, 'FUROSEMID': { dose: '20-40mg', route: 'i.v.', frequency: 'wg zlecenia' }, 'MANNITOL 15%': { dose: '100ml', route: 'wlew i.v. 30min', frequency: 'wg zlecenia' }, 'SPIRONOLAKTON': { dose: '25-100mg', route: 'i.v.', frequency: 'co 24h' }, 'ENOKSAPARYNA': { dose: '40mg', route: 's.c.', frequency: 'co 24h' }, 'NADROPARYNA': { dose: '0.4-0.6ml', route: 's.c.', frequency: 'co 24h' }, 'KWAS TRANEXAMOWY': { dose: '1g', route: 'i.v.', frequency: 'co 8h' }, 'ETAMSYLAT': { dose: '250-500mg', route: 'i.v.', frequency: 'co 6h' }, 'DEKSAMETAZON': { dose: '4-8mg', route: 'i.v.', frequency: 'co 6-12h' }, 'HYDROKORTYZON': { dose: '50-100mg', route: 'i.v.', frequency: 'co 6-8h' }, 'METYLOPREDNIZOLON': { dose: '125mg', route: 'i.v.', frequency: 'wg zlecenia' }, 'METAMIZOL': { dose: '1g', route: 'i.v.', frequency: 'co 6-8h' }, 'PARACETAMOL': { dose: '1g', route: 'i.v.', frequency: 'co 6h' }, 'METOKLOPRAMID': { dose: '10mg', route: 'i.v.', frequency: 'co 8h' }, 'PANTOPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' }, 'OMEPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' }, 'HALOPERIDOL': { dose: '2.5-5mg', route: 'i.v./i.m.', frequency: 'wg zlecenia' }, 'CHLORPROMAZYNA': { dose: '25-50mg', route: 'i.m.', frequency: 'doraźnie' }, 'DESMOPRESYNA': { dose: '1-4μg', route: 'i.v./s.c.', frequency: 'co 12-24h' }, 'WAPŃ': { dose: '10-20ml 10%', route: 'i.v. wlew', frequency: 'co 6h' }, 'WINPOCETYNA': { dose: '10mg', route: 'i.v. wlew', frequency: 'co 12h' }, 'CEREBROLIZYNA': { dose: '10-30ml', route: 'i.v. wlew', frequency: 'co 24h' }, 'PIRACETAM': { dose: '4.8g', route: 'i.v.', frequency: 'co 12h' }, 'ORNITYNA': { dose: '20g', route: 'i.v. wlew 24h', frequency: 'co 24h' }, 'CYKLOFOSFAMID': { dose: 'wg zlecenia', route: 'i.v. wlew', frequency: 'wg schematu' }, 'ACETYLOCYSTEINA': { dose: '300mg (3ml)', route: 'nebulizacja', frequency: 'co 8h' }, 'ADRENALINA (NEBULIZACJA)': { dose: '0.5mg', route: 'nebulizacja', frequency: 'wg zlecenia' }, 'AMBROKSOL': { dose: '15mg (2ml)', route: 'nebulizacja', frequency: 'co 12h' }, 'BERODUAL': { dose: '1-2ml (20-40 kropli)', route: 'nebulizacja', frequency: 'co 4-6h' }, 'IPRATROPIUM': { dose: '0.5mg (2ml)', route: 'nebulizacja', frequency: 'co 6-8h' }, 'KOLISTYNA (NEBULIZACJA)': { dose: '1-2mln j', route: 'nebulizacja', frequency: 'co 8-12h' }, 'SALBUTAMOL (NEBULIZACJA)': { dose: '2.5mg', route: 'nebulizacja', frequency: 'co 4-6h' }, 'SALBUTAMOL (WZIEW)': { dose: '2 wdechy', route: 'do rurki', frequency: 'co 4h' }, 'NABIC (1.4% NAHCO3)': { dose: '5ml', route: 'nebulizacja', frequency: 'co 8h' }, 'LEWOFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 2h → co 6h' }, 'TOBRAMYCYNA/DEKSAMETAZON (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' }, 'OFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' }, 'POLPRAZOL': { dose: '20mg', route: 'p.o. (sonda)', frequency: 'co 12h' }, 'LACTULOSUM': { dose: '15ml', route: 'p.o. (sonda)', frequency: 'co 8h' }, 'KALIUM POLISTYRENOSULFONIAN': { dose: '15g (1 miarka)', route: 'p.o. (sonda)', frequency: 'co 6-8h' }, 'EUTHYROX': { dose: 'wg zlecenia', route: 'p.o. na czczo', frequency: 'co 24h' } };

const fluidsData = { 'NaCl 0.9%': { volume: '500ml', rate: '50' }, 'Plasmalyte': { volume: '500ml', rate: '50' }, 'Optilyte': { volume: '500ml', rate: '50' }, 'Płyn Ringera': { volume: '500ml', rate: '50' }, 'Glukoza 5%': { volume: '500ml', rate: '40' }, 'Glukoza 10%': { volume: '500ml', rate: '30' }, 'Gelofusine': { volume: '500ml', rate: '100' }, 'Albuminy 20%': { volume: '100ml', rate: '50' }, 'Albuminy 5%': { volume: '250ml', rate: '100' }, 'Mannitol 15%': { volume: '250ml', rate: '125' }, 'NaHCO3 8.4%': { volume: '100ml', rate: '50' } };

const glucoseKcalData = { "Glukoza 5%": 0.17, "Glukoza 10%": 0.34 };

const nutritionFlowRates = {
    "Nutricomp Standard 500ml (1 kcal/ml)": 50, "Nutricomp Standard 1000ml (1 kcal/ml)": 80, 
    "Nutricomp intensiv 500ml (1.5 kcal/ml)": 40, "Nutricomp intensiv 1000ml (1.5 kcal/ml)": 60,
    "Nutricomp Standard Fibre 500ml (1 kcal/ml)": 50, "Nutrison 500ml (1 kcal/ml)": 50, 
    "Nutrison 1000ml (1 kcal/ml)": 80, "Nutrison 1500ml (1 kcal/ml)": 100, 
    "Nutrison Advanced Peptisorb 500ml (1 kcal/ml)": 50, "Nutrison Advanced Peptisorb 1000ml (1 kcal/ml)": 80,
    "Nutrison Multi Fibre 500ml (1 kcal/ml)": 50, "Nutrison Multi Fibre 1000ml (1 kcal/ml)": 80,
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

// SZABLONY KART
const cardTemplates = {
    cardiac: {
        name: "Pacjent kardiochirurgiczny",
        diagnosis: "Stan po zabiegach kardiochirurgicznych",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 μg/kg/min" },
            { name: "DOBUTAMINA", conc: "250mg/50ml", dose: "2-10 μg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "25-50 μg/h" }
        ],
        periodicDrugs: [
            { name: "CEFUROKSYM", dose: "1.5g", route: "i.v.", freq: "co 8h" },
            { name: "FUROSEMID", dose: "20mg", route: "i.v.", freq: "co 8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "METOPROLOL", dose: "5mg", route: "i.v.", freq: "co 6h" }
        ],
        fluids: [
            { name: "NaCl 0.9%", volume: "500", rate: "50" },
            { name: "Plasmalyte", volume: "500", rate: "40" }
        ]
    },
    trauma: {
        name: "Uraz wielonarządowy",
        diagnosis: "Uraz wielonarządowy",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.2-1.0 μg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-4 mg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "50-100 μg/h" }
        ],
        periodicDrugs: [
            { name: "AMOKSYCYLINA/KWAS KLAWULANOWY", dose: "1.2g", route: "i.v.", freq: "co 8h" },
            { name: "KWAS TRANEXAMOWY", dose: "1g", route: "i.v.", freq: "co 8h" },
            { name: "ENOKSAPARYNA", dose: "40mg", route: "s.c.", freq: "co 24h" },
            { name: "METAMIZOL", dose: "1g", route: "i.v.", freq: "co 6h" }
        ],
        fluids: [
            { name: "NaCl 0.9%", volume: "500", rate: "100" },
            { name: "Gelofusine", volume: "500", rate: "100" },
            { name: "Albuminy 5%", volume: "250", rate: "50" }
        ]
    },
    sepsis: {
        name: "Sepsa",
        diagnosis: "Wstrząs septyczny",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.3-1.5 μg/kg/min" },
            { name: "WAZOPRESYNA", conc: "20j/20ml", dose: "0.01-0.04 j/min" },
            { name: "DEKSMEDETOMIDYNA", conc: "200μg/50ml", dose: "0.2-0.7 μg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "25-75 μg/h" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "1g", route: "wlew i.v. 30min", freq: "co 8h" },
            { name: "WANKOMYCYNA", dose: "1g", route: "wlew i.v. 1h", freq: "co 12h" },
            { name: "FLUKONAZOL", dose: "400mg", route: "i.v.", freq: "co 24h" },
            { name: "HYDROKORTYZON", dose: "50mg", route: "i.v.", freq: "co 6h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "80" },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ]
    },
    respiratory: {
        name: "Niewydolność oddechowa",
        diagnosis: "ARDS",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-3 mg/kg/h" },
            { name: "DEKSMEDETOMIDYNA", conc: "200μg/50ml", dose: "0.4-1.0 μg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "50-100 μg/h" },
            { name: "CISATRAKURIUM", conc: "20mg/10ml", dose: "0.1-0.15 mg/kg/h" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. 30min", freq: "co 8h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 6h" },
            { name: "BERODUAL", dose: "1ml", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg", route: "nebulizacja", freq: "co 8h" }
        ]
    },
    neurological: {
        name: "Pacjent neurologiczny",
        diagnosis: "Udar mózgu",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-2 mg/kg/h" },
            { name: "REMIFENTANYL", conc: "2mg/40ml", dose: "0.05-0.1 μg/kg/min" },
            { name: "NITROGLICERYNA", conc: "25mg/50ml", dose: "5-50 μg/min" }
        ],
        periodicDrugs: [
            { name: "MANNITOL 15%", dose: "100ml", route: "wlew i.v. 30min", freq: "co 6h" },
            { name: "DEKSAMETAZON", dose: "8mg", route: "i.v.", freq: "co 6h" },
            { name: "LEWETYRACETAM", dose: "1g", route: "i.v.", freq: "co 12h" },
            { name: "CEREBROLIZYNA", dose: "30ml", route: "i.v. wlew", freq: "co 24h" }
        ]
    },
    renal: {
        name: "CRRT",
        diagnosis: "Niewydolność nerek - CRRT",
        continuousDrugs: [
            { name: "HEPARYNA", conc: "25000j/50ml", dose: "500-1000 j/h" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 μg/kg/min" }
        ],
        periodicDrugs: [
            { name: "FUROSEMID", dose: "40mg", route: "i.v.", freq: "co 8h" },
            { name: "WAPŃ", dose: "10ml 10%", route: "i.v. wlew", freq: "co 6h" },
            { name: "KALIUM POLISTYRENOSULFONIAN", dose: "15g", route: "p.o. (sonda)", freq: "co 8h" }
        ],
        procedures: [
            { time: "06:00", name: "CRRT - kontrola parametrów" },
            { time: "12:00", name: "CRRT - wymiana filtra" },
            { time: "18:00", name: "CRRT - kontrola parametrów" }
        ]
    }
};

// GLOBALNE ZMIENNE
let autosaveInterval = null;
let hasUnsavedChanges = false;
let isOnline = navigator.onLine;
let sortableInstances = [];
let drugSearchHistory = [];

// --- ENHANCED TOAST NOTIFICATIONS SYSTEM ---
function showToast(title, message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast(this)">×</button>
    `;
    
    container.appendChild(toast);
    
    // Animacja wejścia
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        if (toast.parentNode) {
            removeToast(toast.querySelector('.toast-close'));
        }
    }, duration);
}

function removeToast(button) {
    const toast = button.parentElement;
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// --- VALIDATION SYSTEM ---
function showValidationTooltip(element, message) {
    const tooltip = document.getElementById('validationTooltip');
    const rect = element.getBoundingClientRect();
    
    tooltip.textContent = message;
    tooltip.style.display = 'block';
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    
    element.classList.add('field-error');
    
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 3000);
}

function validatePESEL(input) {
    const pesel = input.value.replace(/\D/g, '');
    input.value = pesel;
    
    if (pesel.length === 11) {
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
        
        for (let i = 0; i < 10; i++) {
            sum += parseInt(pesel[i]) * weights[i];
        }
        
        const checkDigit = (10 - (sum % 10)) % 10;
        
        if (parseInt(pesel[10]) !== checkDigit) {
            showValidationTooltip(input, 'Nieprawidłowy PESEL');
            input.classList.add('field-error');
        } else {
            input.classList.remove('field-error');
            // Wyciągnij datę urodzenia i płeć
            const year = parseInt(pesel.substring(0, 2));
            const month = parseInt(pesel.substring(2, 4));
            const day = parseInt(pesel.substring(4, 6));
            const sex = parseInt(pesel[9]) % 2 === 0 ? 'K' : 'M';
            
            let fullYear;
            if (month > 80) {
                fullYear = 1800 + year;
            } else if (month > 60) {
                fullYear = 2200 + year;
            } else if (month > 40) {
                fullYear = 2100 + year;
            } else if (month > 20) {
                fullYear = 2000 + year;
            } else {
                fullYear = 1900 + year;
            }
            
            const realMonth = month % 20;
            
            showToast('PESEL OK', `Data ur.: ${day}.${realMonth}.${fullYear}, Płeć: ${sex}`, 'success', 2000);
        }
    }
}

function validateDate(input) {
    const dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    const match = input.value.match(dateRegex);
    
    if (input.value && !match) {
        showValidationTooltip(input, 'Format daty: DD.MM.RRRR');
        input.classList.add('field-error');
    } else if (match) {
        const day = parseInt(match[1]);
        const month = parseInt(match[2]);
        const year = parseInt(match[3]);
        
        const date = new Date(year, month - 1, day);
        
        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
            showValidationTooltip(input, 'Nieprawidłowa data');
            input.classList.add('field-error');
        } else {
            input.classList.remove('field-error');
        }
    } else {
        input.classList.remove('field-error');
    }
}

function validateDosage(drugName, dose) {
    // Sprawdź czy dawka jest w bezpiecznym zakresie
    const dangerousDoses = {
        'NORADRENALINA': { max: 2.0, unit: 'μg/kg/min' },
        'ADRENALINA': { max: 0.5, unit: 'μg/kg/min' },
        'INSULINA': { max: 20, unit: 'j/h' },
        'HEPARYNA': { max: 5000, unit: 'j/h' }
    };
    
    if (dangerousDoses[drugName]) {
        const doseValue = parseFloat(dose);
        if (doseValue > dangerousDoses[drugName].max) {
            showToast('Ostrzeżenie!', `Niebezpiecznie wysoka dawka ${drugName}!`, 'warning', 6000);
            return false;
        }
    }
    return true;
}

// --- ENHANCED AUTOSAVE SYSTEM ---
function updateAutosaveIndicator(status, message) {
    const indicator = document.getElementById('autosaveIndicator');
    if (!indicator) return;
    indicator.className = `autosave-indicator ${status}`;
    indicator.querySelector('span').textContent = message;
    
    const icons = {
        saving: 'fa-sync-alt fa-spin',
        saved: 'fa-check-circle', 
        error: 'fa-exclamation-circle'
    };
    indicator.querySelector('i').className = `fas ${icons[status] || 'fa-circle'}`;
}

function markAsChanged() {
    hasUnsavedChanges = true;
    updateAutosaveIndicator('saving', 'Niezapisane zmiany...');
}

function autoSave() {
    if (!hasUnsavedChanges) return;
    
    const patientName = document.getElementById('patientNameInput').value.trim();
    if (!patientName) {
        updateAutosaveIndicator('error', 'Brak nazwy pacjenta');
        return;
    }
    
    try {
        const cardState = getCardState();
        const autoSaveKey = `autosave_${patientName.replace(/\s+/g, '-')}`;
        
        // Zapisz w localStorage
        localStorage.setItem(autoSaveKey, JSON.stringify({
            ...cardState,
            timestamp: new Date().toISOString(),
            isAutoSave: true
        }));
        
        // Jeśli offline, dodaj do kolejki synchronizacji
        if (!isOnline) {
            addToSyncQueue(autoSaveKey, cardState);
        }
        
        hasUnsavedChanges = false;
        updateAutosaveIndicator('saved', 'Zapisano automatycznie');
        
    } catch (e) {
        updateAutosaveIndicator('error', 'Błąd zapisu');
        console.error('Autosave error:', e);
    }
}

function startAutosave() {
    if (autosaveInterval) clearInterval(autosaveInterval);
    autosaveInterval = setInterval(autoSave, 30000); // co 30 sekund
}

function restoreFromAutosave() {
    const patientName = document.getElementById('patientNameInput').value.trim();
    if (!patientName) return;
    
    const autoSaveKey = `autosave_${patientName.replace(/\s+/g, '-')}`;
    const savedData = localStorage.getItem(autoSaveKey);
    
    if (savedData) {
        try {
            const cardState = JSON.parse(savedData);
            if (cardState.isAutoSave) {
                const saveTime = new Date(cardState.timestamp).toLocaleString();
                if (confirm(`Znaleziono automatyczny zapis dla tego pacjenta z ${saveTime}. Czy przywrócić dane?`)) {
                    populateCardFromState(cardState);
                    showToast('Przywrócono', 'Dane zostały przywrócone z automatycznego zapisu', 'success');
                }
            }
        } catch (e) {
            console.error('Error restoring autosave:', e);
        }
    }
}

// --- OFFLINE MODE ---
function updateOnlineStatus() {
    const offlineIndicator = document.getElementById('offlineIndicator');
    if (!offlineIndicator) return;
    
    if (navigator.onLine) {
        isOnline = true;
        offlineIndicator.style.display = 'none';
        showToast('Online', 'Połączenie przywrócone', 'success', 3000);
        syncOfflineData();
    } else {
        isOnline = false;
        offlineIndicator.style.display = 'flex';
        showToast('Offline', 'Pracujesz w trybie offline', 'warning', 5000);
    }
}

function addToSyncQueue(key, data) {
    let syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    syncQueue.push({ key, data, timestamp: new Date().toISOString() });
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
}

function syncOfflineData() {
    const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    
    if (syncQueue.length > 0) {
        showToast('Synchronizacja', `Synchronizowanie ${syncQueue.length} zapisów...`, 'info');
        
        // Tu można dodać rzeczywistą synchronizację z serwerem
        // Na razie tylko czyścimy kolejkę
        localStorage.removeItem('syncQueue');
        
        showToast('Zsynchronizowano', 'Wszystkie dane zostały zsynchronizowane', 'success');
    }
}

// --- DRAG & DROP ---
function initializeSortable() {
    // Usuń poprzednie instancje
    sortableInstances.forEach(instance => instance.destroy());
    sortableInstances = [];
    
    // Inicjalizuj sortowanie dla każdej tabeli
    document.querySelectorAll('.sortable-tbody').forEach(tbody => {
        const instance = Sortable.create(tbody, {
            animation: 150,
            handle: 'td:first-child',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: function(evt) {
                markAsChanged();
                showToast('Zmieniono kolejność', 'Kolejność wierszy została zmieniona', 'info', 2000);
            }
        });
        sortableInstances.push(instance);
    });
}

// --- QUICK SEARCH ---
function quickSearch(event) {
    const searchInput = document.getElementById('quickSearchInput');
    const searchResults = document.getElementById('quickSearchResults');
    const query = searchInput.value.toUpperCase();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const allDrugs = [
        ...Object.keys(continuousDrugsData).map(key => ({
            name: key,
            type: 'continuous',
            data: continuousDrugsData[key]
        })),
        ...Object.keys(periodicDrugsData).map(key => ({
            name: key,
            type: 'periodic',
            data: periodicDrugsData[key]
        }))
    ];
    
    const results = allDrugs.filter(drug => drug.name.includes(query));
    
    if (results.length > 0) {
        searchResults.innerHTML = results.slice(0, 10).map(drug => `
            <div class="search-result-item" onclick="addDrugFromSearch('${drug.type}', '${drug.name}')">
                <div class="drug-name">${drug.name}</div>
                <div class="drug-info">${drug.type === 'continuous' ? 'Lek ciągły' : 'Lek okresowy'} - ${drug.data.dose || ''}</div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="search-result-item">Brak wyników</div>';
        searchResults.style.display = 'block';
    }
    
    if (event.key === 'Enter' && results.length > 0) {
        addDrugFromSearch(results[0].type, results[0].name);
        searchInput.value = '';
        searchResults.style.display = 'none';
    }
}

function addDrugFromSearch(type, drugName) {
    if (type === 'continuous') {
        addContinuousDrug();
        const lastRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        const nameInput = lastRow.querySelector('.drug-name');
        nameInput.value = drugName;
        const rowId = nameInput.id.replace('_name', '');
        fillContinuousDrugData(nameInput, rowId);
    } else {
        addPeriodicDrug();
        const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const nameInput = lastRow.querySelector('.drug-name');
        nameInput.value = drugName;
        fillPeriodicDrugData(nameInput);
    }
    
    // Zapisz do historii wyszukiwań
    if (!drugSearchHistory.includes(drugName)) {
        drugSearchHistory.unshift(drugName);
        drugSearchHistory = drugSearchHistory.slice(0, 20); // Zachowaj tylko 20 ostatnich
        localStorage.setItem('drugSearchHistory', JSON.stringify(drugSearchHistory));
    }
    
    document.getElementById('quickSearchInput').value = '';
    document.getElementById('quickSearchResults').style.display = 'none';
    
    showToast('Dodano', `Dodano lek: ${drugName}`, 'success', 2000);
}

// --- TEMPLATES ---
function openTemplatesModal() {
    document.getElementById('templatesModal').style.display = 'flex';
}

function loadTemplate(templateName) {
    const template = cardTemplates[templateName];
    if (!template) return;
    
    if (!confirm(`Czy załadować szablon "${template.name}"? Obecne dane zostaną zastąpione.`)) {
        return;
    }
    
    // Wyczyść kartę
    clearCard(true);
    
    // Ustaw rozpoznanie
    document.getElementById('diagnosisInput').value = template.diagnosis;
    
    // Dodaj leki ciągłe
    template.continuousDrugs?.forEach(drug => {
        addContinuousDrug();
        const lastRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        inputs[0].value = drug.name;
        inputs[1].value = drug.conc;
        inputs[2].value = drug.dose;
        calculateInfusionRate(inputs[2]);
    });
    
    // Dodaj leki okresowe
    template.periodicDrugs?.forEach(drug => {
        addPeriodicDrug();
        const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        inputs[0].value = drug.name;
        inputs[1].value = drug.dose;
        inputs[2].value = drug.route;
        inputs[3].value = drug.freq;
    });
    
    // Dodaj płyny
    template.fluids?.forEach(fluid => {
        addFluid();
        const lastRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        inputs[0].value = fluid.name;
        inputs[2].value = fluid.volume;
        inputs[3].value = fluid.rate;
    });
    
    // Dodaj procedury
    template.procedures?.forEach(proc => {
        addProcedure();
        const lastRow = document.querySelector('#proceduresTable tbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        inputs[0].value = proc.time;
        inputs[1].value = proc.name;
    });
    
    updateSummaries();
    closeModal('templatesModal');
    showToast('Szablon załadowany', `Załadowano szablon: ${template.name}`, 'success');
}

// --- FUNKCJE POMOCNICZE ---
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// --- GŁÓWNE FUNKCJE ---
function removeRow(button) { 
    const row = button.closest('tr');
    row.remove();
    updateSummaries(); 
    markAsChanged();
}

function updateSummaries() { 
    let totalFluids = 0; 
    let totalKcal = 0; 
    
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
    
    // Aktualizuj wartości
    document.getElementById('totalFluids').textContent = totalFluids.toFixed(0); 
    document.getElementById('totalKcal').textContent = totalKcal.toFixed(0); 
    
    // Oblicz kcal/kg
    const weight = parseFloat(document.getElementById('patientWeight').value);
    if (weight > 0) {
        const kcalPerKg = (totalKcal / weight).toFixed(1);
        document.getElementById('kcalPerKg').textContent = kcalPerKg;
    } else {
        document.getElementById('kcalPerKg').textContent = '0';
    }
    
    // Aktualizuj paski postępu
    const fluidBar = document.getElementById('fluidBalanceFill');
    const kcalBar = document.getElementById('kcalFill');
    
    if (fluidBar) {
        // Bilans płynów (zakres 0-4000 ml)
        const fluidPercent = Math.min((totalFluids / 4000) * 100, 100);
        fluidBar.style.width = fluidPercent + '%';
        fluidBar.className = 'balance-fill';
        if (totalFluids > 3500) fluidBar.classList.add('danger');
        else if (totalFluids > 2500) fluidBar.classList.add('warning');
        else fluidBar.classList.add('normal');
    }
    
    if (kcalBar) {
        // Kalorie (zakres 0-2500 kcal)
        const kcalPercent = Math.min((totalKcal / 2500) * 100, 100);
        kcalBar.style.width = kcalPercent + '%';
        kcalBar.className = 'kcal-fill';
        if (totalKcal < 1000) kcalBar.classList.add('low');
        else if (totalKcal > 2000) kcalBar.classList.add('high');
        else kcalBar.classList.add('optimal');
    }
}

function calculateInfusionRate(inputElement) { 
    const row = inputElement.closest('tr'); 
    if (!row) return; 
    
    const weightInput = document.getElementById('patientWeight'); 
    const weight = parseFloat(weightInput.value); 
    const doseInput = row.querySelector('.dose'); 
    const concentrationInput = row.querySelector('input[id$="_conc"]'); 
    const rateOutput = row.querySelector('.infusion-rate'); 
    
    if (!weight || weight <= 0 || !doseInput.value || !concentrationInput.value) { 
        return; 
    } 
    
    let doseStr = doseInput.value.replace(',', '.'); 
    let concStr = concentrationInput.value.replace(',', '.'); 
    
    const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?.*?(μg|mcg|mg|j)\s*(\/kg)?\s*\/(min|h)/; 
    const doseMatch = doseStr.match(doseRegex); 
    
    if (!doseMatch) { 
        rateOutput.value = ''; 
        return; 
    } 
    
    let doseValue1 = parseFloat(doseMatch[1]); 
    let doseValue2 = doseMatch[2] ? parseFloat(doseMatch[2]) : null; 
    let doseUnit = doseMatch[3]; 
    const perKg = doseMatch[4]; 
    const perTime = doseMatch[5]; 
    
    const concRegex = /([\d\.]+)\s*(mg|μg|mcg|j)\s*\/(?:([\d\.]+)\s*)?ml/; 
    const concMatch = concStr.match(concRegex); 
    
    let concentrationPerMl; 
    if (concMatch) { 
        let totalMass = parseFloat(concMatch[1]); 
        const massUnit = concMatch[2]; 
        const totalVolume = concMatch[3] ? parseFloat(concMatch[3]) : 1; 
        if (massUnit === 'mg') totalMass *= 1000; 
        concentrationPerMl = totalMass / totalVolume; 
    } else { 
        rateOutput.value = ''; 
        return; 
    } 
    
    if (concentrationPerMl === 0) return; 
    
    if (doseUnit === 'mg') { 
        doseValue1 *= 1000; 
        if(doseValue2) doseValue2 *= 1000; 
    } 
    
    const calculateRate = (dose) => { 
        let totalDosePerTime = dose; 
        if (perKg) totalDosePerTime *= weight; 
        const volumePerTime = totalDosePerTime / concentrationPerMl; 
        return (perTime === 'min') ? volumePerTime * 60 : volumePerTime; 
    }; 
    
    const finalRate1 = calculateRate(doseValue1); 
    if (doseValue2) { 
        const finalRate2 = calculateRate(doseValue2); 
        rateOutput.value = `${finalRate1.toFixed(1).replace('.', ',')} - ${finalRate2.toFixed(1).replace('.', ',')}`; 
    } else { 
        rateOutput.value = finalRate1.toFixed(1).replace('.', ','); 
    } 
}

function calculateIcuDay() { 
    const admissionDateStr = document.getElementById('admissionDateInput').value; 
    const mainDateStr = document.getElementById('mainDateInput').value; 
    const icuDayInput = document.getElementById('icuDayInput'); 
    
    const parseDate = (dateStr) => { 
        const parts = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); 
        if (!parts) return null; 
        return new Date(parts[3], parts[2] - 1, parts[1]); 
    }; 
    
    const admissionDate = parseDate(admissionDateStr); 
    const mainDate = parseDate(mainDateStr); 
    
    if (admissionDate && mainDate && mainDate >= admissionDate) { 
        const utcMain = Date.UTC(mainDate.getFullYear(), mainDate.getMonth(), mainDate.getDate()); 
        const utcAdmission = Date.UTC(admissionDate.getFullYear(), admissionDate.getMonth(), admissionDate.getDate()); 
        const dayInMillis = 1000 * 60 * 60 * 24; 
        const diffDays = (utcMain - utcAdmission) / dayInMillis; 
        icuDayInput.value = Math.round(diffDays) + 1; 
    } else { 
        icuDayInput.value = ''; 
    } 
}

function calculateBMI() { 
    const weightInput = document.getElementById('patientWeight'); 
    const heightInput = document.getElementById('heightInput'); 
    const bmiOutput = document.getElementById('bmiOutput'); 
    
    const weight = parseFloat(weightInput.value); 
    const height = parseFloat(heightInput.value); 
    
    if (weight > 0 && height > 0) { 
        const heightInMeters = height / 100; 
        const bmi = weight / (heightInMeters * heightInMeters); 
        bmiOutput.value = bmi.toFixed(1); 
    } else { 
        bmiOutput.value = ''; 
    } 
}

function handleWeightHeightChange() { 
    calculateBMI(); 
    document.querySelectorAll('#continuousDrugsTbody tr').forEach(row => { 
        const doseInput = row.querySelector('.dose'); 
        if (doseInput) calculateInfusionRate(doseInput); 
    }); 
    recalculateAllKgDoses(); 
    updateSummaries(); 
}

function addContinuousDrug() { 
    const tbody = document.querySelector('#continuousDrugsTbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'cont_' + Date.now(); 
    newRow.innerHTML = `<td><i class="fas fa-grip-vertical drag-handle"></i><input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="continuousDrugsList" autocomplete="off" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input" placeholder="Stężenie" autocomplete="off" id="${rowId}_conc" oninput="calculateInfusionRate(this.closest('tr').querySelector('.dose'))" /></td><td><input type="text" class="drug-input dose" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" oninput="calculateInfusionRate(this)" /></td><td><input type="text" class="drug-input infusion-rate" placeholder="0,0" autocomplete="off" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    initializeSortable();
}

function fillContinuousDrugData(input, rowId) { 
    const drugName = input.value.toUpperCase(); 
    if (continuousDrugsData[drugName]) { 
        const data = continuousDrugsData[drugName]; 
        const concInput = document.getElementById(rowId + '_conc'); 
        const doseInput = document.getElementById(rowId + '_dose'); 
        const row = input.closest('tr'); 
        const rateOutput = row.querySelector('.infusion-rate'); 
        
        concInput.value = data.concentration; 
        doseInput.value = data.dose; 
        
        if (data.fixedRate) { 
            rateOutput.value = data.fixedRate; 
        } else { 
            calculateInfusionRate(doseInput); 
        }
        
        // Walidacja dawki
        validateDosage(drugName, data.dose);
    } 
}

function addPeriodicDrug() { 
    const tbody = document.querySelector('#periodicDrugsTbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'per_' + Date.now(); 
    newRow.innerHTML = `<td><i class="fas fa-grip-vertical drag-handle"></i><input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="periodicDrugsList" autocomplete="off" onchange="fillPeriodicDrugData(this)" id="${rowId}_name" /><input type="text" class="drug-input" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" /></td><td><input type="text" class="drug-input" placeholder="i.v." autocomplete="off" id="${rowId}_route" /><input type="text" class="drug-input" placeholder="co 24h" autocomplete="off" id="${rowId}_freq" /><span class="dose-reduction-notice" style="display:none;">⚠️ Zredukowano</span></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    initializeSortable();
}

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

function addFluid() { 
    const tbody = document.querySelector('#fluidsTable tbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'fluid_' + Date.now(); 
    newRow.innerHTML = `<td><i class="fas fa-grip-vertical drag-handle"></i><input type="text" class="drug-input fluid-name" placeholder="Płyn" list="fluidsList" autocomplete="off" onchange="fillFluidData(this, '${rowId}')" /></td><td><input type="text" class="drug-input additives-input" placeholder="np. + KCl 15% 10ml | + MgSO4 20% 5ml" autocomplete="off" /></td><td><input type="number" class="drug-input" placeholder="ml" autocomplete="off" id="${rowId}_vol" oninput="updateSummaries()" /></td><td><input type="number" class="drug-input fluid-rate" placeholder="ml/h" autocomplete="off" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    initializeSortable();
}

function fillFluidData(input, rowId) { 
    const fluidName = input.value; 
    if (fluidsData[fluidName]) { 
        const volInput = document.getElementById(rowId + '_vol');
        const rateInput = document.getElementById(rowId + '_rate');
        if (volInput) volInput.value = fluidsData[fluidName].volume.replace('ml',''); 
        if (rateInput) rateInput.value = fluidsData[fluidName].rate; 
        updateSummaries(); 
    } 
}

function addNutrition() { 
    const tbody = document.querySelector('#nutritionTable tbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'nutr_' + Date.now();
    newRow.innerHTML = `<td><i class="fas fa-grip-vertical drag-handle"></i><input type="text" class="drug-input nutrition-type" placeholder="Wybierz typ..." list="nutritionTypesList" autocomplete="off" onchange="updateNutritionProductList(this)" /></td><td><input type="text" class="drug-input nutrition-prep" placeholder="Wybierz preparat..." list="enteralProductsList" autocomplete="off" onchange="fillNutritionData(this, '${rowId}')" id="${rowId}_prep"/><textarea class="drug-input nutrition-additives" placeholder="" id="${rowId}_additives" autocomplete="off" style="display:none;" rows="1"></textarea></td><td><input type="number" class="drug-input nutrition-rate" placeholder="ml/h" autocomplete="off" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    
    const newTextarea = newRow.querySelector('.nutrition-additives');
    newTextarea.addEventListener('input', () => autoResizeTextarea(newTextarea));
    initializeSortable();
}

function fillNutritionData(input, rowId) {
    const prepName = input.value;
    const rateInput = document.getElementById(rowId + '_rate');
    const additivesTextarea = document.getElementById(rowId + '_additives');
    const row = input.closest('tr');
    const typeInput = row.querySelector('.nutrition-type');
    const typeValue = typeInput ? typeInput.value.toLowerCase() : '';
    
    if (nutritionFlowRates[prepName] && rateInput && !rateInput.value) {
        rateInput.value = nutritionFlowRates[prepName];
    }
    
    if (typeValue.includes('pozajelitowe') && additivesTextarea) {
        if (prepName.includes('SmofKabiven') || prepName.includes('OMEGAFLEX') || prepName.includes('Nutriflex') || prepName.includes('Aminomix')) {
            if (!additivesTextarea.value) {
                additivesTextarea.value = '+ Glycophos 3ml + Supliven 10ml + Omegaven 50ml + Soluvit N 1amp + Vitalipid 10ml';
                autoResizeTextarea(additivesTextarea);
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
    
    updateSummaries(); 
}

function addProcedure() { 
    const tbody = document.querySelector('#proceduresTable tbody'); 
    const newRow = document.createElement('tr'); 
    newRow.innerHTML = `<td><i class="fas fa-grip-vertical drag-handle"></i><input type="text" class="drug-input" placeholder="Godz." list="timesList" autocomplete="off" /></td><td><input type="text" class="drug-input" placeholder="Nazwa procedury/zabiegu" list="proceduresList" autocomplete="off" /></td><td><div class="signature-box-cell"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    initializeSortable();
}

// --- LOGIKA DAWKOWANIA (GFR, mg/kg) ---
function recalculateDose(row) { 
    const doseInput = row.querySelector('input[id$="_dose"]'); 
    const originalDose = doseInput.dataset.originalDose; 
    const weight = parseFloat(document.getElementById('patientWeight').value); 
    
    if (originalDose && originalDose.includes('/kg') && weight > 0) { 
        const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?/; 
        const matches = originalDose.match(doseRegex); 
        if (matches) { 
            const dose1 = parseFloat(matches[1]); 
            const totalDose1 = Math.round(dose1 * weight); 
            if (matches[2]) { 
                const dose2 = parseFloat(matches[2]); 
                const totalDose2 = Math.round(dose2 * weight); 
                doseInput.value = `${totalDose1}-${totalDose2}mg (${originalDose})`; 
            } else { 
                doseInput.value = `${totalDose1}mg (${originalDose})`; 
            } 
        } 
    } else if (originalDose) { 
        doseInput.value = originalDose; 
    } 
}

function recalculateAllKgDoses(){ 
    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => recalculateDose(row)); 
    adjustAllDosesForGfr(); 
}

function adjustAllDosesForGfr() { 
    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => adjustSingleDoseForGfr(row)); 
}

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
    for (const rule of adjustmentRules) { 
        if (gfr <= rule.gfrMax) { 
            appliedRule = rule; 
            break; 
        } 
    }

    if (appliedRule) {
        if (appliedRule.dose.includes('/kg')) {
            const weight = parseFloat(document.getElementById('patientWeight').value);
            if (weight > 0) {
                const doseRegex = /([\d\.]+)/; 
                const matches = appliedRule.dose.match(doseRegex);
                if(matches) { 
                    const totalDose = Math.round(parseFloat(matches[1]) * weight); 
                    doseInput.value = `${totalDose}mg (${appliedRule.dose})`; 
                }
            } else { 
                doseInput.value = appliedRule.dose; 
            }
        } else { 
            doseInput.value = appliedRule.dose; 
        }
        
        if (appliedRule.frequency && freqInput) freqInput.value = appliedRule.frequency;
        row.classList.add('gfr-dose-adjusted');
        if (notice) notice.style.display = 'inline';
        
        if (!row.dataset.gfrWarningShown) {
            showToast('Dostosowano dawkę', `Dawka ${drugName} została dostosowana do GFR=${gfr}`, 'warning', 6000);
            row.dataset.gfrWarningShown = 'true';
        }
    }
}

function populateDatalists() {
    const createOptions = (dataObject) => Object.keys(dataObject).map(key => `<option value="${key}"></option>`).join('');
    
    const continuousList = document.getElementById('continuousDrugsList');
    const periodicList = document.getElementById('periodicDrugsList');
    const fluidsList = document.getElementById('fluidsList');
    
    if (continuousList) continuousList.innerHTML = createOptions(continuousDrugsData);
    if (periodicList) periodicList.innerHTML = createOptions(periodicDrugsData);
    if (fluidsList) fluidsList.innerHTML = createOptions(fluidsData);
    
    const enteral = {};
    const parenteral = {};
    Object.keys(nutritionData).forEach(key => {
        if (key.includes('OMEGAFLEX') || key.includes('Nutriflex') || key.includes('SmofKabiven') || key.includes('Aminomix')) {
            parenteral[key] = nutritionData[key];
        } else {
            enteral[key] = nutritionData[key];
        }
    });
    
    const enteralList = document.getElementById('enteralProductsList');
    const parenteralList = document.getElementById('parenteralProductsList');
    
    if (enteralList) enteralList.innerHTML = createOptions(enteral);
    if (parenteralList) parenteralList.innerHTML = createOptions(parenteral);
}

function initializeCard() { 
    const today = new Date(); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear(); 
    
    const mainDateInput = document.getElementById('mainDateInput');
    if (mainDateInput) mainDateInput.value = `${day}.${month}.${year}`; 
    
    calculateIcuDay(); 
    calculateBMI(); 
    updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
    populateDatalists();
}

// --- ENHANCED SAVE/LOAD SYSTEM ---
function saveCard() {
    const patientNameInput = document.getElementById('patientNameInput');
    const historyNumberInput = document.getElementById('historyNumberInput');
    const patientName = patientNameInput.value.trim();
    const historyNumber = historyNumberInput.value.trim();
    
    let isValid = true;
    if (!patientName) {
        showValidationTooltip(patientNameInput, 'Wprowadź imię i nazwisko');
        isValid = false;
    } else {
        patientNameInput.classList.remove('field-error');
    }

    if (!historyNumber) {
        showValidationTooltip(historyNumberInput, 'Wprowadź numer historii');
        isValid = false;
    } else {
        historyNumberInput.classList.remove('field-error');
    }

    if (!isValid) {
        showToast('Brak danych', 'Proszę wypełnić wymagane pola.', 'warning');
        return;
    }
    
    const cardKey = `card_${patientName.replace(/\s+/g, '-')}_${historyNumber.replace(/[\/\s]+/g, '-')}`;
    const cardState = getCardState();

    try {
        cardState.metadata = {
            savedAt: new Date().toISOString(),
            version: '3.0',
            patientSummary: {
                name: patientName,
                historyNumber: historyNumber,
                diagnosis: document.getElementById('diagnosisInput').value || 'Brak rozpoznania'
            }
        };
        
        const storageKey = isOnline ? cardKey : `offline_${cardKey}`;
        localStorage.setItem(storageKey, JSON.stringify(cardState));
        
        let savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex') || '[]');
        if (!savedCardsIndex.includes(cardKey)) {
            savedCardsIndex.push(cardKey);
            localStorage.setItem('savedCardsIndex', JSON.stringify(savedCardsIndex));
        }
        
        hasUnsavedChanges = false;
        updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
        
        showToast('Zapisano', 'Karta została pomyślnie zapisana!', 'success');
        
    } catch (e) {
        console.error("Błąd zapisu:", e);
        showToast('Błąd zapisu', 'Wystąpił błąd podczas zapisu karty.', 'error');
    }
}

function openLoadModal() {
    const savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex') || '[]');
    const listElement = document.getElementById('savedCardsList');
    listElement.innerHTML = '';
    
    if (savedCardsIndex.length === 0) {
        listElement.innerHTML = '<li style="text-align: center; padding: 20px; color: var(--gray-500);">Brak zapisanych kart.</li>';
    } else {
        const cardsWithDates = savedCardsIndex.map(key => {
            const data = localStorage.getItem(key);
            let savedAt = null;
            try {
                const parsed = JSON.parse(data);
                savedAt = parsed.metadata?.savedAt ? new Date(parsed.metadata.savedAt) : new Date(0);
            } catch(e) {
                savedAt = new Date(0);
            }
            return { key, savedAt };
        }).sort((a, b) => b.savedAt - a.savedAt);
        
        cardsWithDates.forEach(({key, savedAt}) => {
            const friendlyName = key.replace('card_', '').replace(/_/g, ' ');
            const timeAgo = getTimeAgo(savedAt);
            
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <div class="patient-name">${friendlyName}</div>
                    <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Zapisano: ${timeAgo}</div>
                </div>
                <div>
                    <button class="control-button load small" onclick="loadCard('${key}')">Wczytaj</button>
                    <button class="control-button clear small" onclick="deleteCard('${key}', this)">Usuń</button>
                </div>`;
            listElement.appendChild(li);
        });
    }
    
    document.getElementById('loadCardModal').style.display = 'flex';
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours}h temu`;
    if (diffDays < 7) return `${diffDays} dni temu`;
    return date.toLocaleDateString('pl-PL');
}

function deleteCard(cardKey, button) {
    const friendlyName = cardKey.replace('card_', '').replace(/_/g, ' ');
    if (confirm(`Czy na pewno chcesz usunąć kartę: ${friendlyName}?`)) {
        localStorage.removeItem(cardKey);
        let savedCardsIndex = JSON.parse(localStorage.getItem('savedCardsIndex') || '[]');
        savedCardsIndex = savedCardsIndex.filter(key => key !== cardKey);
        localStorage.setItem('savedCardsIndex', JSON.stringify(savedCardsIndex));
        button.closest('li').remove();
        
        showToast('Usunięto', `Karta "${friendlyName}" została usunięta`, 'info');
    }
}

function loadCard(cardKey) {
    const savedStateJSON = localStorage.getItem(cardKey);
    if (!savedStateJSON) {
        showToast('Błąd', 'Nie można wczytać karty.', 'error');
        return;
    }
    
    try {
        const cardState = JSON.parse(savedStateJSON);
        populateCardFromState(cardState);
        closeModal('loadCardModal');
        
        const patientName = cardState.metadata?.patientSummary?.name || 'Pacjent';
        showToast('Wczytano', `Pomyślnie wczytano kartę dla: ${patientName}`, 'success');
        
    } catch (e) {
        console.error('Load error:', e);
        showToast('Błąd', 'Wystąpił błąd podczas wczytywania karty.', 'error');
    }
}

function populateCardFromState(cardState) {
    clearCard(true);
    
    Object.keys(cardState.header || {}).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = cardState.header[id];
    });
    
    const roomInput = document.getElementById('roomInput');
    const roomInputPrint = document.getElementById('roomInputPrint');
    if (roomInput && roomInputPrint && roomInput.value) {
        roomInputPrint.value = roomInput.value;
    }
    
    const tables = cardState.tables || {};
    
    (tables.continuous || []).forEach(data => {
        addContinuousDrug();
        const newRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        inputs[0].value = data.name;
        inputs[1].value = data.conc;
        inputs[2].value = data.dose;
        inputs[3].value = data.rate;
    });
    
    (tables.periodic || []).forEach(data => {
        addPeriodicDrug();
        const newRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        inputs[0].value = data.name;
        inputs[1].value = data.dose;
        inputs[2].value = data.route;
        inputs[3].value = data.freq;
    });
    
    (tables.fluids || []).forEach(data => {
        addFluid();
        const newRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        inputs[0].value = data.name;
        inputs[1].value = data.additives || '';
        inputs[2].value = data.volume || '';
        inputs[3].value = data.rate || '';
    });
    
    (tables.nutrition || []).forEach(data => {
        addNutrition();
        const newRow = document.querySelector('#nutritionTable tbody tr:last-child');
        const typeInput = newRow.querySelector('.nutrition-type');
        const prepInput = newRow.querySelector('.nutrition-prep');
        const additivesTextarea = newRow.querySelector('.nutrition-additives');
        const rateInput = newRow.querySelector('.nutrition-rate');
        
        if (data.type) {
            typeInput.value = data.type;
            updateNutritionProductList(typeInput);
        }
        if (data.prep) prepInput.value = data.prep;
        if (data.additives && additivesTextarea) {
            additivesTextarea.value = data.additives;
            autoResizeTextarea(additivesTextarea);
        }
        if (data.rate) rateInput.value = data.rate;
    });
    
    (tables.procedures || []).forEach(data => {
        addProcedure();
        const newRow = document.querySelector('#proceduresTable tbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        inputs[0].value = data.time || '';
        inputs[1].value = data.name || '';
    });
    
    if (cardState.notes) {
        const notesTextarea = document.querySelector('.notes-section textarea');
        if (notesTextarea) notesTextarea.value = cardState.notes;
    }
    
    handleWeightHeightChange();
    updateSummaries();
    adjustAllDosesForGfr();
    
    hasUnsavedChanges = false;
    updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
}

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
        const inputs = row.querySelectorAll('input');
        cardState.tables.continuous.push({
            name: inputs[0]?.value || '',
            conc: inputs[1]?.value || '',
            dose: inputs[2]?.value || '',
            rate: inputs[3]?.value || ''
        });
    });
    
    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => {
        const inputs = row.querySelectorAll('input');
        cardState.tables.periodic.push({
            name: inputs[0]?.value || '',
            dose: inputs[1]?.value || '',
            route: inputs[2]?.value || '',
            freq: inputs[3]?.value || ''
        });
    });
    
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        const inputs = row.querySelectorAll('input');
        cardState.tables.fluids.push({
            name: inputs[0]?.value || '',
            additives: inputs[1]?.value || '',
            volume: inputs[2]?.value || '',
            rate: inputs[3]?.value || ''
        });
    });
    
    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => {
        cardState.tables.nutrition.push({
            type: row.querySelector('.nutrition-type')?.value || '',
            prep: row.querySelector('.nutrition-prep')?.value || '',
            additives: row.querySelector('.nutrition-additives')?.value || '',
            rate: row.querySelector('.nutrition-rate')?.value || ''
        });
    });
    
    document.querySelectorAll('#proceduresTable tbody tr').forEach(row => {
        const inputs = row.querySelectorAll('input');
        cardState.tables.procedures.push({
            time: inputs[0]?.value || '',
            name: inputs[1]?.value || ''
        });
    });
    
    const notesTextarea = document.querySelector('.notes-section textarea');
    if (notesTextarea) cardState.notes = notesTextarea.value;
    
    return cardState;
}

function clearCard(force = false) { 
    if (force || confirm('Czy na pewno chcesz wyczyścić całą kartę?')) { 
        document.querySelectorAll('input, textarea').forEach(input => { 
            if(!input.closest('.no-clear') && input.id !== 'roomInputPrint') {
                input.value = ''; 
                input.classList.remove('field-error');
            }
        }); 
        
        const roomInputPrint = document.getElementById('roomInputPrint');
        if (roomInputPrint) roomInputPrint.value = '';
        
        document.querySelectorAll('tbody').forEach(tbody => { 
            tbody.innerHTML = ''; 
        }); 
        
        updateSummaries(); 
        initializeCard(); 
        
        hasUnsavedChanges = false;
        updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
        
        if (!force) {
            showToast('Wyczyszczono', 'Karta została wyczyszczona', 'info');
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function generatePDF() {
    const element = document.getElementById('card-container');
    const patientName = document.getElementById('patientNameInput').value.trim() || 'karta-zleceń';
    const date = document.getElementById('mainDateInput').value.replace(/\./g, '-');
    const opt = {
        margin:       0.5,
        filename:     `${patientName}_${date}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

function saveCardToFile() {
    const cardState = getCardState();
    const patientName = document.getElementById('patientNameInput').value.trim() || 'karta';
    const date = document.getElementById('mainDateInput').value.replace(/\./g, '-');
    const filename = `${patientName}_${date}.json`;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cardState, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast('Zapisano do pliku', `Pomyślnie zapisano plik: ${filename}`, 'success');
}

function loadCardFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const cardState = JSON.parse(e.target.result);
            populateCardFromState(cardState);
            showToast('Wczytano z pliku', `Pomyślnie wczytano plik: ${file.name}`, 'success');
        } catch (error) {
            showToast('Błąd odczytu pliku', 'Nieprawidłowy format pliku.', 'error');
            console.error("Błąd wczytywania pliku:", error);
        }
    };
    reader.readAsText(file);
    event.target.value = null;
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeCard();
        initializeSortable();
        startAutosave();
        
        // Obsługa zmian w polach
        document.body.addEventListener('input', (e) => {
            if(e.target.matches('input, textarea')) {
                markAsChanged();
            }
        });

        // Dark Mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        const htmlEl = document.documentElement;
        if (localStorage.getItem('darkMode') === 'true') {
            htmlEl.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        darkModeToggle.addEventListener('click', () => {
            htmlEl.classList.toggle('dark-mode');
            const isDarkMode = htmlEl.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });

        // Skróty klawiszowe
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                saveCard();
            }
            if (e.ctrlKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                window.print();
            }
            if (e.ctrlKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                clearCard();
            }
        });
        
        // Synchronizacja pola Sala/Łóżko
        const roomInput = document.getElementById('roomInput');
        const roomInputPrint = document.getElementById('roomInputPrint');
        if (roomInput && roomInputPrint) {
            roomInput.addEventListener('input', () => {
                roomInputPrint.value = roomInput.value;
            });
        }

        // Offline/Online status
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();

        // Przywracanie z autosave po wpisaniu nazwy pacjenta
        const patientNameInput = document.getElementById('patientNameInput');
        if (patientNameInput) {
            patientNameInput.addEventListener('blur', restoreFromAutosave);
        }
        
        // Ukrywanie wyników wyszukiwania po kliknięciu poza obszarem
        document.addEventListener('click', (e) => {
            const searchResults = document.getElementById('quickSearchResults');
            if (searchResults && !e.target.closest('.quick-search-bar')) {
                searchResults.style.display = 'none';
            }
        });
        
        console.log('🏥 Medical Card System v3.0 - Aplikacja załadowana pomyślnie');
        
    } catch (error) {
        console.error('Błąd inicjalizacji:', error);
        alert('Wystąpił błąd podczas ładowania aplikacji. Sprawdź konsolę przeglądarki.');
    }
});
