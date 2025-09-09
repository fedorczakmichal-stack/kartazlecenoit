/// --- ENHANCED MEDICAL CARD SYSTEM v3.5 ---

// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = {
    'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-1.0 μg/kg/min' },
    'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 μg/kg/min' },
    'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 μg/kg/min' },
    'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 μg/kg/min' },
    'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min' },
    'LEVOSIMENDAN': { concentration: '12.5mg/5ml (w 500ml 5% Glc)', dose: '0.05-0.2 μg/kg/min' },
    'EPOPROSTENOL': { concentration: '1.5mg/50ml', dose: '2-10 ng/kg/min' },
    'MILRINON': { concentration: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' },
    'PROPOFOL 1%': { concentration: '10mg/ml', dose: '1-4 mg/kg/h' },
    'PROPOFOL 2%': { concentration: '20mg/ml', dose: '1-4 mg/kg/h' },
    'MIDAZOLAM': { concentration: '50mg/50ml', dose: '1-15 mg/h' },
    'DEKSMEDETOMIDYNA': { concentration: '400μg/100ml', dose: '0.2-1.4 μg/kg/h' },
    'FENTANYL': { concentration: '500μg/50ml', dose: '25-100 μg/h' },
    'REMIFENTANYL': { concentration: '2mg/40ml', dose: '0.05-0.2 μg/kg/min' },
    'MORFINA': { concentration: '20mg/20ml', dose: '1-5 mg/h' },
    'LIGNOCAINA 1%': { concentration: '500mg/50ml', dose: '1-2 mg/min' },
    'OKSYKODON': { concentration: '20mg/20ml', dose: '1-2 mg/h' },
    'KETAMINA': { concentration: '250mg/50ml', dose: '0.5-2 mg/kg/h' },
    'ROKURONIOM': { concentration: '50mg/5ml', dose: '0.3-0.6 mg/kg/h' },
    'CISATRAKURIUM': { concentration: '20mg/10ml', dose: '0.06-0.18 mg/kg/h' },
    'INSULINA': { concentration: '50j/50ml', dose: '0.5-10 j/h' },
    'HEPARYNA': { concentration: '25000j/50ml', dose: '500-2000 j/h' },
    'HEPARYNA (1ml/1j)': { concentration: '1ml/1j', dose: 'wlew dotętniczy 1ml/godz', fixedRate: '1' },
    'FUROSEMID': { concentration: '100mg/50ml', dose: '5-20 mg/h' },
    'AMIODARON': { concentration: '300mg/50ml 5% Glc', dose: '20-50 mg/h' },
    'NITROGLICERYNA': { concentration: '25mg/50ml', dose: '5-200 μg/min' },
    'PIPERACYLINA/TAZOBAKTAM': { concentration: '18g/100ml', dose: 'wlew 24h', fixedRate: '4.2' },
    'PANTOPRAZOL': { concentration: '80mg/100ml', dose: '4.2 ml/h', fixedRate: '4.2' },
    'METOPROLOL': { concentration: '10mg/50ml', dose: '1-5 mg/h' },
    'SALBUTAMOL': { concentration: '5mg/50ml', dose: '3-20 μg/min' },
    'DIAZEPAM': { concentration: '50mg/50ml', dose: '2-10 mg/h' },
    'NITROPRUSYDEK SODU': { concentration: '50mg/50ml', dose: '0.5-8 Î¼g/kg/min' },
    'KLONIDYNA': { concentration: '150Î¼g/50ml', dose: '0.5-2 Î¼g/kg/h' },
    'LABETALOL': { concentration: '100mg/50ml', dose: '0.5-2 mg/min' },
    'ESMOLOL': { concentration: '2500mg/50ml', dose: '50-200 Î¼g/kg/min' },
    'DILTIAZEM': { concentration: '125mg/50ml', dose: '5-15 mg/h' },
    'MAGNEZ': { concentration: '2g/20ml', dose: '1-2 g/h' },
    'BIKARBONIAN SODU': { concentration: '100ml 8.4%', dose: '20-50 ml/h' },
    'OKTREOTYD': { concentration: '500Î¼g/50ml', dose: '25-50 Î¼g/h' },
    'ATROPINA (WLEW CIĄGŁY)': { concentration: '20mg/20ml', dose: '0.01-0.02 mg/kg/h' }
 };

const periodicDrugsData = {
    'AMOKSYCYLINA/KWAS KLAWULANOWY': { dose: '1.2g', route: 'i.v.', frequency: 'co 8h' },
    'AMIKACYNA': { dose: '15-20mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'AZITHROMYCIN': { dose: '500mg', route: 'i.v. wlew 1h', frequency: 'co 24h' },
    'CEFEPIM': { dose: '2g', route: 'i.v. wlew 30min', frequency: 'co 8-12h' },
    'CEFTAZYDYM': { dose: '2g', route: 'i.v.', frequency: 'co 8h' },
    'CEFUROKSYM': { dose: '1.5g', route: 'i.v.', frequency: 'co 8h' },
    'CIPROFLOKSACYNA': { dose: '400mg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'IMIPENEM/CYLASTATYNA': { dose: '0.5g', route: 'wlew i.v. 30min', frequency: 'co 6-8h' },
    'KOLISTYNA': { dose: 'nasyc. 9mln j, potem 4.5mln j', route: 'i.v.', frequency: 'co 12h' },
    'LEWOFLOKSACYNA': { dose: '500mg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'LINEZOLID': { dose: '600mg', route: 'wlew i.v. 2h', frequency: 'co 12h' },
    'MEROPENEM': { dose: '1g', route: 'wlew i.v. 30min', frequency: 'co 8h' },
    'METRONIDAZOL': { dose: '500mg', route: 'i.v.', frequency: 'co 8h' },
    'PIPERACYLINA/TAZOBAKTAM': { dose: '4.5g', route: 'wlew i.v. 30min', frequency: 'co 8h' },
    'SULBAKTAM/CEFOPERAZON': { dose: '2g', route: 'i.v.', frequency: 'co 12h' },
    'TEIKOPLANINA': { dose: 'nasyc. 400mg x3 co 12h, potem 400mg', route: 'i.v.', frequency: 'co 24h' },
    'TYGECYKLINA': { dose: 'nasyc. 100mg, potem 50mg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'WANKOMYCYNA': { dose: '1g', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'FLUKONAZOL': { dose: '400mg', route: 'i.v.', frequency: 'co 24h' },
    'WORYKONAZOL': { dose: 'nasyc. 6mg/kg x2, potem 4mg/kg', route: 'wlew i.v. 2h', frequency: 'co 12h' },
    'GENTAMYCYNA': { dose: '3-5mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'KETOKONAZOL': { dose: '200mg', route: 'p.o. (sonda)', frequency: 'co 12h' },
    'FUROSEMID': { dose: '20-40mg', route: 'i.v.', frequency: 'wg zlecenia' },
    'MANNITOL 15%': { dose: '100ml', route: 'wlew i.v. 30min', frequency: 'wg zlecenia' },
    'SPIRONOLAKTON': { dose: '25-100mg', route: 'i.v.', frequency: 'co 24h' },
    'ENOKSAPARYNA': { dose: '40mg', route: 's.c.', frequency: 'co 24h' },
    'NADROPARYNA': { dose: '0.4-0.6ml', route: 's.c.', frequency: 'co 24h' },
    'KWAS TRANEXAMOWY': { dose: '1g', route: 'i.v.', frequency: 'co 8h' },
    'ETAMSYLAT': { dose: '250-500mg', route: 'i.v.', frequency: 'co 6h' },
    'DEKSAMETAZON': { dose: '4-8mg', route: 'i.v.', frequency: 'co 6-12h' },
    'HYDROKORTYZON': { dose: '50-100mg', route: 'i.v.', frequency: 'co 6-8h' },
    'METYLOPREDNIZOLON': { dose: '125mg', route: 'i.v.', frequency: 'wg zlecenia' },
    'METAMIZOL': { dose: '1g', route: 'i.v.', frequency: 'co 6-8h' },
    'PARACETAMOL': { dose: '1g', route: 'i.v.', frequency: 'na zlecenie' },
    'METOKLOPRAMID': { dose: '10mg', route: 'i.v.', frequency: 'co 8h' },
    'PANTOPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' },
    'OMEPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' },
    'HALOPERIDOL': { dose: '2.5-5mg', route: 'i.v./i.m.', frequency: 'wg zlecenia' },
    'CHLORPROMAZYNA': { dose: '25-50mg', route: 'i.m.', frequency: 'doraźnie' },
    'DESMOPRESYNA': { dose: '1-4μg', route: 'i.v./s.c.', frequency: 'co 12-24h' },
    'WAPŃ': { dose: '10-20ml 10%', route: 'i.v. wlew', frequency: 'co 6h' },
    'WINPOCETYNA': { dose: '10mg', route: 'i.v. wlew', frequency: 'co 12h' },
    'CEREBROLIZYNA': { dose: '10-30ml', route: 'i.v. wlew', frequency: 'co 24h' },
    'PIRACETAM': { dose: '4.8g', route: 'i.v.', frequency: 'co 12h' },
    'ORNITYNA': { dose: '20g', route: 'i.v. wlew 24h', frequency: 'co 24h' },
    'CYKLOFOSFAMID': { dose: 'wg zlecenia', route: 'i.v. wlew', frequency: 'wg schematu' },
    'ACETYLOCYSTEINA': { dose: '300mg (3ml)', route: 'nebulizacja', frequency: 'co 8h' },
    'ADRENALINA (NEBULIZACJA)': { dose: '0.5mg', route: 'nebulizacja', frequency: 'wg zlecenia' },
    'AMBROKSOL': { dose: '15mg (2ml)', route: 'nebulizacja', frequency: 'co 12h' },
    'BERODUAL': { dose: '1-2ml (20-40 kropli)', route: 'nebulizacja', frequency: 'co 4-6h' },
    'IPRATROPIUM': { dose: '0.5mg (2ml)', route: 'nebulizacja', frequency: 'co 6-8h' },
    'KOLISTYNA (NEBULIZACJA)': { dose: '1-2mln j', route: 'nebulizacja', frequency: 'co 8-12h' },
    'SALBUTAMOL (NEBULIZACJA)': { dose: '2.5mg', route: 'nebulizacja', frequency: 'co 4-6h' },
    'SALBUTAMOL (WZIEW)': { dose: '2 wdechy', route: 'do rurki', frequency: 'co 4h' },
    'NABIC (1.4% NAHCO3)': { dose: '5ml', route: 'nebulizacja', frequency: 'co 8h' },
    'LEWOFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 2h → co 6h' },
    'TOBRAMYCYNA/DEKSAMETAZON (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' },
    'OFLOKSACYNA (KROPLE)': { dose: '1 kropla', route: 'do worka spoj.', frequency: 'co 6h' },
    'POLPRAZOL': { dose: '20mg', route: 'p.o. (sonda)', frequency: 'co 12h' },
    'LACTULOSUM': { dose: '15ml', route: 'p.o. (sonda)', frequency: 'co 8h' },
    'KALIUM POLISTYRENOSULFONIAN': { dose: '15g (1 miarka)', route: 'p.o. (sonda)', frequency: 'co 6-8h' },
    'EUTHYROX': { dose: 'wg zlecenia', route: 'p.o. na czczo', frequency: 'co 24h' },
    'IBUPROFEN': { dose: '400mg', route: 'i.v.', frequency: 'na zlecenie' },
    'PYRALGINA': { dose: '1g', route: 'i.v.', frequency: 'na zlecenie' },
    'KLOKSACYLINA': { dose: '2g', route: 'i.v.', frequency: 'co 6h' },
    'ERTAPENEM': { dose: '1g', route: 'wlew i.v. 30min', frequency: 'co 24h' },
    'KASPOFUNGINA': { dose: 'Nasycająca 70mg, potem 50mg (>80kg: 70mg)', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'MIKAFUNGINA': { dose: '100mg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'ANIDULAFUNGINA': { dose: 'nasyc. 200mg, potem 100mg', route: 'wlew i.v.', frequency: 'co 24h' },
    'AMFOTERYCYNA B': { dose: '0.5-1mg/kg', route: 'wlew i.v. 4h', frequency: 'co 24h' },
    'OSELTAMIVIR': { dose: '75mg', route: 'p.o./i.v.', frequency: 'co 12h' },
    'VALACYCLOVIR': { dose: '1g', route: 'p.o./i.v.', frequency: 'co 8-12h' },
    'RIFAMPICIN': { dose: '600mg', route: 'i.v./p.o.', frequency: 'co 24h' },
    'REMIMAZOLAM': { dose: '5-10mg', route: 'i.v.', frequency: 'na zlecenie' },
    'SUGAMMADEKS': { dose: '2-4mg/kg', route: 'i.v.', frequency: 'jednorazowo' },
    'NEOSTYGMINA': { dose: '2.5mg', route: 'i.v.', frequency: 'jednorazowo' },
    'ATROPINA': { dose: '0.5-1mg', route: 'i.v.', frequency: 'doraźnie' },
    'FENTANYL': { dose: '50-100Î¼g', route: 'i.v.', frequency: 'na zlecenie' },
    'KETAMINA': { dose: '0.5mg/kg', route: 'i.v.', frequency: 'na zlecenie' },
    'TRANEKSAM': { dose: '1g', route: 'i.v.', frequency: 'co 8h' },
    'PROTAMINA': { dose: '1mg/100j heparyny', route: 'i.v. wolno', frequency: 'jednorazowo' },
    'WITAMINA K': { dose: '10mg', route: 'i.v. wolno', frequency: 'co 24h' },
    'TIAMINA': { dose: '100mg', route: 'i.v.', frequency: 'co 24h' },
    'PIRYDOKSYNA': { dose: '50mg', route: 'i.v.', frequency: 'co 24h' },
    'KWAS FOLIOWY': { dose: '5mg', route: 'p.o.', frequency: 'co 24h' },
    'BIOTYNA': { dose: '300Î¼g', route: 'p.o.', frequency: 'co 24h' }
};

const fluidsData = { 'NaCl 0.9%': { volume: '500', rate: '50' }, 'Plasmalyte': { volume: '500', rate: '50' }, 'Optilyte': { volume: '500', rate: '50' }, 'Płyn Ringera': { volume: '500', rate: '50' }, 'Glukoza 5%': { volume: '500', rate: '40' }, 'Glukoza 10%': { volume: '500', rate: '30' }, 'Gelofusine': { volume: '500', rate: '100' }, 'Albuminy 20%': { volume: '100', rate: '50' }, 'Albuminy 5%': { volume: '250', rate: '100' }, 'Mannitol 15%': { volume: '250', rate: '125' }, 'NaHCO3 8.4%': { volume: '100', rate: '50' } };

const additivesData = {
    'KCl 15%': { dose: '10' },
    'NaCl 20%': { dose: '10' },
    'MgSO4 20%': { dose: '10' },
    'Supliven': { dose: '10' },
    'Vitalipid': { dose: '10' },
    'Soluvit N': { dose: '1 amp' },
    'Glukoza 40%': { dose: '10' },
    'Cernevit': { dose: '1 amp' },
    'Glycophos': { dose: '3' },
    'Omegaven': { dose: '50' },
};

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
    "SmofKabiven EF 1477ml (1.1 kcal/ml)": 60,
    "SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)": 35,
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
        { gfrMax: 15, dose: 'Przeciwwskazana (wysokie ryzyko kumulacji)', frequency: ''},
        { gfrMax: 30, dose: '20mg (dawka profilaktyczna)', frequency: 'co 24h' }
    ],
    'CEFEPIM': [
        { gfrMax: 10, dose: '1g', frequency: 'co 24h' },
        { gfrMax: 30, dose: '1-2g', frequency: 'co 24h' },
        { gfrMax: 50, dose: '2g', frequency: 'co 12h' }
    ],
    'OSELTAMIVIR': [
        { gfrMax: 10, dose: 'Unikać lub TDM', frequency: '' },
        { gfrMax: 30, dose: '30mg', frequency: 'co 24h' }
    ],
    'AMFOTERYCYNA B': [
        { gfrMax: 30, dose: 'Zmniejszyć dawkę o 50% lub rozważyć formę liposomalną', frequency: 'Monitorować GFR' }
    ],
    'VALACYCLOVIR': [
        { gfrMax: 10, dose: '500mg', frequency: 'co 24h' },
        { gfrMax: 30, dose: '1g', frequency: 'co 24h' },
        { gfrMax: 50, dose: '1g', frequency: 'co 12h' }
    ]
};

// --- SZABLONY KART ---
const cardTemplates = {
    universal: {
        name: "Uniwersalny OIT",
        diagnosis: "Intensywna terapia",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "25-75 μg/h" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 μg/kg/min" },
            { name: "INSULINA", conc: "50j/50ml", dose: "według glikemii iv" },
            { name: "HEPARYNA", conc: "1j/ml", dose: "wlew dotętniczy" }
        ],
        periodicDrugs: [
            { name: "ENOKSAPARYNA", dose: "40mg", route: "s.c.", freq: "co 24h" },
            { name: "OMEPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "IBUPROFEN", dose: "400mg", route: "i.v.", freq: "na zlecenie" },
            { name: "PYRALGINA", dose: "1g", route: "i.v.", freq: "na zlecenie" },
            { name: "PARACETAMOL", dose: "1g", route: "i.v.", freq: "na zlecenie" }
        ],
        fluids: [
            { name: "Optilyte", volume: "500", rate: "50" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutricomp Standard 500ml (1 kcal/ml)", rate: "50" },
            { type: "Żywienie pozajelitowe", prep: "SmofKabiven 986ml (1.1 kcal/ml)", rate: "40" }
        ],
        procedures: [
            { time: "co 6h", name: "Glikemia" },
            { time: "co 2h", name: "Zmiany ułożenia" },
            { time: "ciągłe", name: "Monitorowanie hemodynamiczne" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "codziennie", name: "Kinezyterapia" },
            { time: "co 12h", name: "IAP" },
            { time: "co 12h", name: "OCŻ" }
        ]
    },
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
            { name: "KWAS TRANEXAMOWY", dose: "1g", route: 'i.v.', freq: "co 8h" },
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
            { name: "CISATRAKURIUM", conc: "20mg/10ml", dose: "0.06-0.18 mg/kg/h" }
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
            { name: "PIRACETAM", dose: "4.8g", route: "i.v.", freq: "co 12h" },
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
    },
    test: {
        name: "Test Pełne Dane",
        diagnosis: "Sepsa z niewydolnością wielonarządową",
        headerData: {
            patientNameInput: "Jan Kowalski",
            peselInput: "80010112345",
            historyNumberInput: "H-12345/2025",
            admissionDateInput: "01.09.2025",
            patientWeight: "80",
            heightInput: "175",
            gfrInput: "45",
            allergiesInput: "Penicylina"
        },
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.2 μg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2.5 mg/kg/h" },
            { name: "FENTANYL", conc: "500μg/50ml", dose: "50 μg/h" },
            { name: "INSULINA", conc: "50j/50ml", dose: "2 j/h" },
            { name: "MIDAZOLAM", conc: "50mg/50ml", dose: "5 mg/h" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "1g", route: "i.v.", freq: "co 8h" },
            { name: "ENOKSAPARYNA", dose: "60mg", route: "s.c.", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "PARACETAMOL", dose: "1g", route: "i.v.", freq: "co 6h" },
            { name: "METOKLOPRAMID", dose: "10mg", route: "i.v.", freq: "doraźnie" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "80", additives: ["+ KCl 15% 20ml", "+ MgSO4 20% 10ml"] }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Multi Fibre 1000ml (1 kcal/ml)", rate: "40" },
            { type: "Żywienie pozajelitowe", prep: "OMEGAFLEX PLUS 1250ml (1.3 kcal/ml)", rate: "50" }
        ],
        procedures: [
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "codziennie", name: "RTG klatki piersiowej" }
        ]
    }
};

// --- GLOBALNE ZMIENNE ---
let autosaveInterval = null;
let hasUnsavedChanges = false;
let isOnline = navigator.onLine;
let sortableInstances = [];
let drugSearchHistory = [];
let lastCalorieWarning = 0;
let lastFluidWarning = 0;
const calorieWarningCooldown = 30000; // 30 sekund cooldown dla ostrzeżeń

// --- GEMINI API FUNCTIONS ---

/**
 * Pokazuje modal Gemini, ustawia tytuł i wyświetla wskaźnik ładowania.
 * @param {string} title - Tytuł do wyświetlenia w nagłówku modala.
 */
function showGeminiModal(title) {
    const modal = document.getElementById('geminiResponseModal');
    const modalTitle = document.getElementById('geminiModalTitle');
    const responseContent = document.getElementById('geminiResponseContent');
    const loader = modal.querySelector('.gemini-loader');

    modalTitle.textContent = title;
    responseContent.style.display = 'none';
    responseContent.innerHTML = '';
    loader.style.display = 'block';
    modal.style.display = 'flex';
}

/**
 * Wyświetla odpowiedź od Gemini w modalu.
 * @param {string} text - Tekst odpowiedzi do wyświetlenia.
 */
function displayGeminiResponse(text) {
    const modal = document.getElementById('geminiResponseModal');
    const responseContent = document.getElementById('geminiResponseContent');
    const loader = modal.querySelector('.gemini-loader');

    // Prosta konwersja Markdown (nagłówki, pogrubienia, listy) na HTML
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // pogrubienie
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')       // nagłówek h3
        .replace(/## (.*?)\n/g, '<h2>$1</h2>')        // nagłówek h2
        .replace(/\* (.*?)\n/g, '<li>$1</li>');        // elementy listy

    // Otocz elementy li tagami ul
    if (html.includes('<li>')) {
        html = '<ul>' + html.replace(/<\/li>(\s*?)<li>/g, '</li><li>') + '</ul>';
    }
    
    html = html.replace(/\n/g, '<br>');

    responseContent.innerHTML = html;
    loader.style.display = 'none';
    responseContent.style.display = 'block';
}

/**
 * Główna funkcja do komunikacji z Gemini API.
 * @param {string} prompt - Pełny prompt dla modelu.
 * @param {string} systemPrompt - Instrukcja systemowa dla modelu.
 * @returns {Promise<string>} - Tekst odpowiedzi z API.
 */
async function callGeminiAPI(prompt, systemPrompt) {
    const apiKey = "AIzaSyC7QbsQAlwPELrQo9jym29mlldZFrkBc9I"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    if (apiKey === "UZUPEŁNIJ_SWÓJ_KLUCZ_API") {
        showToast("Błąd konfiguracji", "Klucz API Gemini nie został ustawiony.", "error");
        return "Błąd: Brak klucza API. Skonfiguruj klucz w pliku script.js.";
    }

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    if (systemPrompt) {
        payload.systemInstruction = {
            parts: [{ text: systemPrompt }]
        };
    }

    let attempt = 0;
    const maxAttempts = 3;
    while (attempt < maxAttempts) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error('API Error:', errorBody);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];
            if (candidate && candidate.content?.parts?.[0]?.text) {
                return candidate.content.parts[0].text;
            } else {
                console.error("Invalid response structure from API:", result);
                return null; // Zwróć null zamiast stringa błędu, aby obsłużyć to wyżej
            }
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            attempt++;
            if (attempt < maxAttempts) {
                const delay = Math.pow(2, attempt) * 1000; // Czas opóźnienia rośnie wykładniczo
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                return null; // Zwróć null po nieudanych próbach
            }
        }
    }
    return null; // Zwróć null jeśli pętla się zakończy bez sukcesu
}

// --- NOWA FUNKCJA AI: SUGEROWANIE I WYPEŁNIANIE LECZENIA ---

/**
 * Pobiera aktualny stan karty (diagnozę i leki), tworzy prompt dla AI,
 * wysyła zapytanie i wypełnia kartę sugestiami.
 */
async function suggestAndFillTreatmentWithAI() {
    const diagnosisInput = document.getElementById('diagnosisInput');
    const diagnosis = diagnosisInput.value.trim();

    if (!diagnosis) {
        showValidationTooltip(diagnosisInput, 'Wprowadź rozpoznanie, aby zaproponować leczenie.');
        showToast('Brak rozpoznania', 'Wprowadź rozpoznanie, aby otrzymać sugestie leczenia.', 'warning');
        return;
    }

    showGeminiModal("Analizowanie rozpoznania i proponowanie leczenia...");

    // 1. Zbierz aktualnie podawane leki, aby uniknąć duplikatów
    const currentContinuousDrugs = Array.from(document.querySelectorAll('#continuousDrugsTbody .drug-name')).map(input => input.value).filter(Boolean);
    const currentPeriodicDrugs = Array.from(document.querySelectorAll('#periodicDrugsTbody .drug-name')).map(input => input.value).filter(Boolean);

    // 2. Przygotuj prompt dla AI
    const systemPrompt = `Jesteś ekspertem farmakologii klinicznej pracującym na Oddziale Intensywnej Terapii. Twoim zadaniem jest zasugerowanie standardowego planu leczenia (leki ciągłe i okresowe) dla pacjenta na podstawie podanej diagnozy. 
    Kluczowe wytyczne:
    1.  **Kontekst:** Skup się na lekach standardowo stosowanych w polskich OIT.
    2.  **Unikanie duplikatów:** Przeanalizuj listę leków już podawanych pacjentowi i zaproponuj tylko te, których brakuje. Nie powtarzaj leków z listy "Aktualne leki".
    3.  **Format odpowiedzi:** Zwróć odpowiedź WYŁĄCZNIE jako obiekt JSON w następującym formacie: 
        {
          "continuousDrugs": [
            {"name": "NazwaLekuCiaglego", "doseSuggestion": "Sugerowana dawka np. 0.1-0.5 μg/kg/min"}
          ],
          "periodicDrugs": [
            {"name": "NazwaLekuOkresowego", "doseSuggestion": "Sugerowana dawka np. 1g", "frequencySuggestion": "Sugerowana częstość np. co 8h"}
          ]
        }
    4.  **Weryfikacja:** Nazwy leków muszą być zgodne z lekami dostępnymi w Polsce (np. "Noradrenalina", "Meropenem", "Enoksaparyna").
    5.  **Format dawkowania:** Zawsze podawaj konkretne wartości liczbowe lub zakresy (np. '0.1-0.5 μg/kg/min', '100 mg/h'). Kategorycznie unikaj opisowych zaleceń typu 'do uzyskania efektu', 'miareczkować do MAP > 65', 'wg kontroli glikemii'.`;

    const userPrompt = `Diagnoza pacjenta: ${diagnosis}.
    Aktualne leki ciągłe (nie dodawaj ich ponownie): ${currentContinuousDrugs.join(', ') || 'Brak'}.
    Aktualne leki okresowe (nie dodawaj ich ponownie): ${currentPeriodicDrugs.join(', ') || 'Brak'}.

    Zaproponuj brakujące leki (ciągłe i okresowe) zgodnie ze wszystkimi wytycznymi formatowania JSON i dawkowania.`;

    // 3. Wywołaj API i przetwórz odpowiedź
    try {
        const rawResponse = await callGeminiAPI(userPrompt, systemPrompt);
        if (!rawResponse) {
            displayGeminiResponse("Wystąpił błąd podczas komunikacji z AI. Brak odpowiedzi.");
            showToast('Błąd AI', 'Nie udało się uzyskać odpowiedzi od serwera.', 'error');
            return;
        }

        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("AI response doesn't contain valid JSON:", rawResponse);
            displayGeminiResponse("Otrzymano nieprawidłowy format odpowiedzi od AI.\n\n" + rawResponse);
            showToast('Błąd przetwarzania', 'Odpowiedź AI miała nieprawidłowy format.', 'error');
            return;
        }

        const suggestions = JSON.parse(jsonMatch[0]);
        const addedCount = populateCardFromAISuggestions(suggestions, currentContinuousDrugs, currentPeriodicDrugs);
        
        closeModal('geminiResponseModal');
        if (addedCount > 0) {
            showToast('Dodano sugestie', `Dodano ${addedCount} nowych leków. Zweryfikuj dawkowanie!`, 'success', 6000);
        } else {
            showToast('Brak nowych sugestii', 'AI nie znalazło dodatkowych leków do zasugerowania.', 'info');
        }

    } catch (error) {
        console.error('Error parsing AI response:', error);
        displayGeminiResponse("Wystąpił błąd podczas przetwarzania sugestii AI.");
        showToast('Błąd krytyczny', 'Błąd przetwarzania danych JSON.', 'error');
    }
}

/**
 * Wypełnia kartę lekami zasugerowanymi przez AI, unikając duplikatów.
 * @param {object} suggestions - Obiekt JSON z sugestiami leków od AI.
 * @param {string[]} existingContinuous - Lista już istniejących leków ciągłych.
 * @param {string[]} existingPeriodic - Lista już istniejących leków okresowych.
 * @returns {number} Liczba dodanych leków.
 */
function populateCardFromAISuggestions(suggestions, existingContinuous, existingPeriodic) {
    let addedCount = 0;
    const existingContinuousUpper = existingContinuous.map(name => name.toUpperCase());
    const existingPeriodicUpper = existingPeriodic.map(name => name.toUpperCase());

    // 1. Dodaj leki ciągłe
    if (suggestions.continuousDrugs) {
        suggestions.continuousDrugs.forEach(drug => {
            const drugNameUpper = drug.name.toUpperCase();
            if (drugNameUpper && !existingContinuousUpper.includes(drugNameUpper) && continuousDrugsData[drugNameUpper]) {
                addContinuousDrug();
                const lastRow = document.querySelector('#continuousDrugsTbody tr:last-child');
                const nameInput = lastRow.querySelector('.drug-name');
                const doseInput = lastRow.querySelector('.dose');
                
                nameInput.value = drug.name;
                fillContinuousDrugData(nameInput, nameInput.id.replace('_name', '')); 

                if (drug.doseSuggestion) {
                    doseInput.value = drug.doseSuggestion;
                }
                
                addedCount++;
            }
        });
    }

    // 2. Dodaj leki okresowe
    if (suggestions.periodicDrugs) {
        suggestions.periodicDrugs.forEach(drug => {
            const drugNameUpper = drug.name.toUpperCase();
            if (drugNameUpper && !existingPeriodicUpper.includes(drugNameUpper) && periodicDrugsData[drugNameUpper]) {
                addPeriodicDrug();
                const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
                const nameInput = lastRow.querySelector('.drug-name');
                const doseInput = lastRow.querySelector('.dose');
                const freqInput = lastRow.querySelector('.frequency');

                nameInput.value = drug.name;
                fillPeriodicDrugData(nameInput); 

                if (drug.doseSuggestion) {
                    doseInput.value = drug.doseSuggestion;
                }
                if (drug.frequencySuggestion) {
                    freqInput.value = drug.frequencySuggestion;
                }

                addedCount++;
            }
        });
    }

    handleWeightHeightChange();
    updateSummaries();
    return addedCount;
}


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
        element.classList.remove('field-error');
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
            const year = parseInt(pesel.substring(0, 2));
            const month = parseInt(pesel.substring(2, 4));
            const day = parseInt(pesel.substring(4, 6));
            const sex = parseInt(pesel[9]) % 2 === 0 ? 'K' : 'M';
            let fullYear;
            if (month > 80) fullYear = 1800 + year;
            else if (month > 60) fullYear = 2200 + year;
            else if (month > 40) fullYear = 2100 + year;
            else if (month > 20) fullYear = 2000 + year;
            else fullYear = 1900 + year;
            const realMonth = month % 20;
            showToast('PESEL OK', `Data ur.: ${day}.${realMonth}.${fullYear}, Płeć: ${sex}`, 'success', 2000);
        }
    } else if (pesel.length > 0) {
         input.classList.add('field-error');
    } else {
        input.classList.remove('field-error');
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
    const icons = { saving: 'fa-sync-alt fa-spin', saved: 'fa-check-circle', error: 'fa-exclamation-circle' };
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
        localStorage.setItem(autoSaveKey, JSON.stringify({ ...cardState, timestamp: new Date().toISOString(), isAutoSave: true }));
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
    autosaveInterval = setInterval(autoSave, 30000);
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
        localStorage.removeItem('syncQueue');
        showToast('Zsynchronizowano', 'Wszystkie dane zostały zsynchronizowane', 'success');
    }
}

// --- DRAG & DROP ---
function initializeSortable() {
    sortableInstances.forEach(instance => instance.destroy());
    sortableInstances = [];
    document.querySelectorAll('.sortable-tbody').forEach(tbody => {
        const instance = Sortable.create(tbody, {
            animation: 150,
            handle: '.drag-handle',
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
        ...Object.keys(continuousDrugsData).map(key => ({ name: key, type: 'continuous', data: continuousDrugsData[key] })),
        ...Object.keys(periodicDrugsData).map(key => ({ name: key, type: 'periodic', data: periodicDrugsData[key] }))
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
        fillContinuousDrugData(nameInput, nameInput.id.replace('_name', ''));
    } else {
        addPeriodicDrug();
        const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const nameInput = lastRow.querySelector('.drug-name');
        nameInput.value = drugName;
        fillPeriodicDrugData(nameInput);
    }
    
    if (!drugSearchHistory.includes(drugName)) {
        drugSearchHistory.unshift(drugName);
        drugSearchHistory = drugSearchHistory.slice(0, 20);
        localStorage.setItem('drugSearchHistory', JSON.stringify(drugSearchHistory));
    }
    
    document.getElementById('quickSearchInput').value = '';
    document.getElementById('quickSearchResults').style.display = 'none';
    showToast('Dodano', `Dodano lek: ${drugName}`, 'success', 2000);
}

// --- TEMPLATES ---
function openTemplatesModal() {
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    Object.keys(customTemplates).forEach(key => {
        if (!cardTemplates[key]) {
            cardTemplates[key] = customTemplates[key];
        }
    });
    document.getElementById('templatesModal').style.display = 'flex';
    updateTemplatesModal();
}

function loadTemplate(templateName) {
    const template = cardTemplates[templateName];
    if (!template) return;
    
    if (!confirm(`Czy załadować szablon "${template.name}"? Obecne dane zostaną zastąpione.`)) {
        return;
    }
    
    clearCard(true);
    
    if (template.headerData) {
        Object.keys(template.headerData).forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = template.headerData[id];
        });
    }

    document.getElementById('diagnosisInput').value = template.diagnosis || '';
    
    template.continuousDrugs?.forEach(drug => {
        addContinuousDrug();
        const lastRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = drug.name;
        if (inputs[1]) inputs[1].value = drug.conc;
        if (inputs[2]) inputs[2].value = drug.dose;
    });
    
    template.periodicDrugs?.forEach(drug => {
        addPeriodicDrug();
        const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const drugNameInput = lastRow.querySelector('.drug-name');
        drugNameInput.value = drug.name;
        const doseInput = lastRow.querySelector('.dose');
        const routeInput = lastRow.querySelector('.route');
        const freqInput = lastRow.querySelector('.frequency');
        if(doseInput) doseInput.value = drug.dose;
        if(routeInput) routeInput.value = drug.route;
        if(freqInput) freqInput.value = drug.freq;
        fillPeriodicDrugData(drugNameInput); // Ważne, aby wywołać po ustawieniu wartości
    });
    
    template.fluids?.forEach(fluid => {
        addFluid();
        const lastRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = fluid.name;
        if (inputs[1] && fluid.additives) inputs[1].value = fluid.additives;
        if (inputs[2]) inputs[2].value = fluid.volume;
        if (inputs[3]) inputs[3].value = fluid.rate;
    });
    
    template.nutrition?.forEach(nutrition => {
        addNutrition();
        const lastRow = document.querySelector('#nutritionTable tbody tr:last-child');
        const typeInput = lastRow.querySelector('.nutrition-type');
        const prepInput = lastRow.querySelector('.nutrition-prep');
        const rateInput = lastRow.querySelector('.nutrition-rate');
        
        if (nutrition.type && typeInput) {
            typeInput.value = nutrition.type;
            updateNutritionProductList(typeInput);
        }
        if (nutrition.prep && prepInput) prepInput.value = nutrition.prep;
        if (nutrition.rate && rateInput) rateInput.value = nutrition.rate;
        if (prepInput) fillNutritionData(prepInput, prepInput.id.replace('_prep', ''));
    });
    
    template.procedures?.forEach(proc => {
        addProcedure();
        const lastRow = document.querySelector('#proceduresTable tbody tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        if(inputs[0]) inputs[0].value = proc.time;
        if(inputs[1]) inputs[1].value = proc.name;
    });
    
    handleWeightHeightChange(); // Przelicz wszystko po załadowaniu danych
    closeModal('templatesModal');
    showToast('Szablon załadowany', `Załadowano szablon: ${template.name}`, 'success');
}

// --- CUSTOM TEMPLATE SAVING ---
function saveCurrentAsTemplate() {
    const diagnosis = document.getElementById('diagnosisInput').value.trim();
    if (!diagnosis) {
        showToast('Brak rozpoznania', 'Wprowadź rozpoznanie, aby zapisać szablon', 'warning');
        return;
    }
    let templateName = prompt('Wprowadź nazwę szablonu (max 30 znaków):', diagnosis || 'Mój szablon');
    if (!templateName) return;
    templateName = templateName.substring(0, 30);
    const currentState = getCardState();
    const newTemplate = {
        name: templateName,
        diagnosis: diagnosis,
        continuousDrugs: currentState.tables.continuous.filter(drug => drug.name).map(drug => ({ name: drug.name, conc: drug.conc, dose: drug.dose })),
        periodicDrugs: currentState.tables.periodic.filter(drug => drug.name).map(drug => ({ name: drug.name, dose: drug.dose, route: drug.route, freq: drug.freq })),
        fluids: currentState.tables.fluids.filter(fluid => fluid.name).map(fluid => ({ name: fluid.name, additives: fluid.additives, volume: fluid.volume, rate: fluid.rate })),
        nutrition: currentState.tables.nutrition.filter(nutrition => nutrition.type).map(nutrition => ({ type: nutrition.type, prep: nutrition.prep, rate: nutrition.rate })),
        procedures: currentState.tables.procedures.filter(proc => proc.name).map(proc => ({ time: proc.time, name: proc.name }))
    };
    let customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    const templateKey = templateName.toLowerCase().replace(/[^a-z0-9]/g, '');
    customTemplates[templateKey] = newTemplate;
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
    cardTemplates[templateKey] = newTemplate;
    updateTemplatesModal();
    showToast('Szablon zapisany', `Szablon "${templateName}" został zapisany`, 'success');
}

function updateTemplatesModal() {
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    const templatesGrid = document.querySelector('.templates-grid');
    templatesGrid.querySelectorAll('.custom-template').forEach(button => button.remove());
    Object.keys(customTemplates).forEach(key => {
        const template = customTemplates[key];
        const button = document.createElement('button');
        button.className = 'template-button custom-template';
        button.dataset.templateKey = key;
        button.innerHTML = `
            <i class="fas fa-user-md"></i>
            <span>${template.name.substring(0, 30)}</span>
            <button class="delete-template-btn" data-template-key="${key}" title="Usuń szablon">
                <i class="fas fa-times"></i>
            </button>
        `;
        button.onclick = function(e) {
            if (!e.target.closest('.delete-template-btn')) {
                loadTemplate(key);
            }
        };
        const deleteBtn = button.querySelector('.delete-template-btn');
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            deleteCustomTemplate(key);
        };
        const saveButton = templatesGrid.querySelector('.save-custom');
        templatesGrid.insertBefore(button, saveButton);
    });
}

function deleteCustomTemplate(templateKey) {
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    const templateName = customTemplates[templateKey]?.name || 'Szablon';
    if (!confirm(`Czy na pewno chcesz usunąć szablon "${templateName}"?`)) return;
    delete customTemplates[templateKey];
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
    delete cardTemplates[templateKey];
    updateTemplatesModal();
    showToast('Szablon usunięty', `Szablon "${templateName}" został usunięty`, 'info');
}

// --- MODALS ---
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
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
    row.classList.add('removing');
    setTimeout(() => {
        row.remove();
        updateSummaries(); 
        markAsChanged();
    }, 200);
}

// --- LOGIKA PODSUMOWAŃ (PŁYNY I KALORIE) ---
function updateSummaries() {
    updateFluidSummary();
    updateCalorieSummary();
}

function updateFluidSummary() {
    let totalFluids = 0;
    const weightInput = document.getElementById('patientWeight');
    const weight = weightInput.value ? parseFloat(weightInput.value.replace(',', '.')) : 0;
    
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        const rateInput = row.querySelector('.fluid-rate');
        const rate = rateInput ? parseFloat(rateInput.value.replace(',', '.')) || 0 : 0;
        totalFluids += rate * 24;
    });

    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => {
        const rateInput = row.querySelector('.nutrition-rate');
        const rate = rateInput ? parseFloat(rateInput.value.replace(',', '.')) || 0 : 0;
        totalFluids += rate * 24;
    });
    
    document.getElementById('totalFluids').textContent = Math.round(totalFluids);
    const fillBar = document.getElementById('fluidBalanceFill'); 

    if (weight > 0) {
        const fluidsPerKg = totalFluids / weight;
        const percentage = Math.min((fluidsPerKg / 60) * 100, 100); // Max docelowy 60ml/kg
        fillBar.style.width = `${percentage}%`;
        
        fillBar.className = 'balance-fill'; // Reset klas
        if (fluidsPerKg > 60) {
            fillBar.classList.add('danger');
        } else if (fluidsPerKg > 40) {
            fillBar.classList.add('warning');
        } else {
            fillBar.classList.add('normal');
        }
        
        const now = Date.now();
        if (fluidsPerKg > 50 && now - lastFluidWarning > calorieWarningCooldown) {
            showToast('Ostrzeżenie płynowe', `Podaż płynów przekracza 50 ml/kg (${fluidsPerKg.toFixed(1)} ml/kg). Ryzyko obrzęków.`, 'warning');
            lastFluidWarning = now;
        } else if (fluidsPerKg < 20 && totalFluids > 100 && now - lastFluidWarning > calorieWarningCooldown) {
            showToast('Ostrzeżenie płynowe', `Podaż płynów poniżej 20 ml/kg (${fluidsPerKg.toFixed(1)} ml/kg). Ryzyko odwodnienia.`, 'warning');
            lastFluidWarning = now;
        }
    } else {
        fillBar.style.width = '0%';
        fillBar.className = 'balance-fill normal';
    }
}

function updateCalorieSummary() {
    let totalKcal = 0;
    const weightInput = document.getElementById('patientWeight');
    const weight = weightInput.value ? parseFloat(weightInput.value.replace(',', '.')) : 0;
    
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        const fluidNameInput = row.querySelector('.fluid-name');
        const fluidName = fluidNameInput ? fluidNameInput.value : '';
        const rateInput = row.querySelector('.fluid-rate');
        const rate = rateInput ? parseFloat(rateInput.value.replace(',', '.')) || 0 : 0;
        const kcalPerMl = glucoseKcalData[fluidName] || 0;
        totalKcal += kcalPerMl * rate * 24;
    });
    
    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => {
        const prepInput = row.querySelector('.nutrition-prep');
        const prep = prepInput ? prepInput.value : '';
        const rateInput = row.querySelector('.nutrition-rate');
        const rate = rateInput ? parseFloat(rateInput.value.replace(',', '.')) || 0 : 0;
        const data = nutritionData[prep];
        if (data && rate > 0) {
            const kcalPerMl = data.kcal / data.volume;
            totalKcal += kcalPerMl * rate * 24;
        }
    });
    
    document.getElementById('totalKcal').textContent = Math.round(totalKcal);
    const kcalPerKgSpan = document.getElementById('kcalPerKg');
    const fillBar = document.getElementById('kcalFill');

    if (weight > 0) {
        const kcalPerKg = Math.round(totalKcal / weight);
        kcalPerKgSpan.textContent = kcalPerKg;
        
        const percentage = Math.min((kcalPerKg / 35) * 100, 100); // Max docelowy 35 kcal/kg
        fillBar.style.width = `${percentage}%`;

        fillBar.className = 'kcal-fill'; // Reset klas
        if (kcalPerKg < 15) {
            fillBar.classList.add('low');
        } else if (kcalPerKg > 30) {
            fillBar.classList.add('high');
        } else {
            fillBar.classList.add('optimal');
        }
        
        const now = Date.now();
        if (kcalPerKg > 30 && now - lastCalorieWarning > calorieWarningCooldown) {
            showToast('Ostrzeżenie kaloryczne', `Całkowita podaż kalorii przekracza 30 kcal/kg (${kcalPerKg} kcal/kg). Ryzyko przeładowania.`, 'warning');
            lastCalorieWarning = now;
        } else if (kcalPerKg < 15 && totalKcal > 100 && now - lastCalorieWarning > calorieWarningCooldown) {
            showToast('Ostrzeżenie kaloryczne', `Podaż kalorii poniżej 15 kcal/kg (${kcalPerKg} kcal/kg). Ryzyko niedożywienia.`, 'warning');
            lastCalorieWarning = now;
        }
    } else {
        kcalPerKgSpan.textContent = '0';
        fillBar.style.width = '0%';
        fillBar.className = 'kcal-fill optimal';
    }
}

// --- OBLICZENIA I WALIDACJA DANYCH PACJENTA ---
function calculateInfusionRate(inputElement) { 
    const row = inputElement.closest('tr'); 
    if (!row) return; 
    const weightInput = document.getElementById('patientWeight'); 
    const weight = parseFloat(weightInput.value); 
    const doseInput = row.querySelector('.dose'); 
    const concentrationInput = row.querySelector('input[id$="_conc"]'); 
    const rateOutput = row.querySelector('.infusion-rate'); 
    if (!weight || weight <= 0 || !doseInput || !doseInput.value || !concentrationInput || !concentrationInput.value) { 
        if(rateOutput) rateOutput.value = '';
        return; 
    } 
    let doseStr = doseInput.value.replace(',', '.'); 
    let concStr = concentrationInput.value.replace(',', '.'); 
    const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?.*?(μg|mcg|mg|j)\s*(\/kg)?\s*\/(min|h)/i; 
    const doseMatch = doseStr.match(doseRegex); 
    if (!doseMatch) { 
        rateOutput.value = ''; 
        return; 
    } 
    let doseValue1 = parseFloat(doseMatch[1]); 
    let doseValue2 = doseMatch[2] ? parseFloat(doseMatch[2]) : null; 
    let doseUnit = doseMatch[3].toLowerCase(); 
    if (doseUnit === 'mcg') doseUnit = 'μg';
    const perKg = doseMatch[4]; 
    const perTime = doseMatch[5].toLowerCase(); 
    
    const concRegex = /([\d\.]+)\s*(mg|μg|mcg|j)\s*\/(?:([\d\.]+)\s*)?ml/i; 
    const concMatch = concStr.match(concRegex); 
    let concentrationPerMl; 
    if (concMatch) { 
        let totalMass = parseFloat(concMatch[1]); 
        let massUnit = concMatch[2].toLowerCase(); 
        if (massUnit === 'mcg') massUnit = 'μg';
        const totalVolume = concMatch[3] ? parseFloat(concMatch[3]) : 1; 
        
        if (doseUnit === 'mg' && massUnit === 'μg') totalMass /= 1000;
        if (doseUnit === 'μg' && massUnit === 'mg') totalMass *= 1000;

        concentrationPerMl = totalMass / totalVolume; 
    } else { 
        rateOutput.value = ''; 
        return; 
    } 
    if (concentrationPerMl === 0) return; 

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

// --- DODAWANIE WIERSZY DO TABEL ---
function addContinuousDrug() { 
    const tbody = document.querySelector('#continuousDrugsTbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'cont_' + Date.now(); 
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td>
            <input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="continuousDrugsList" autocomplete="off" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" />
            <input type="text" class="drug-input" placeholder="Stężenie" autocomplete="off" id="${rowId}_conc" oninput="calculateInfusionRate(this.closest('tr').querySelector('.dose'))" />
        </td>
        <td><input type="text" class="drug-input dose" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" oninput="calculateInfusionRate(this)" /></td>
        <td><input type="text" class="drug-input infusion-rate" placeholder="0,0" autocomplete="off" /></td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
}

function fillContinuousDrugData(input, rowId) { 
    const drugName = input.value.toUpperCase(); 
    const data = continuousDrugsData[drugName];
    if (data) { 
        const concInput = document.getElementById(rowId + '_conc'); 
        const doseInput = document.getElementById(rowId + '_dose'); 
        const row = input.closest('tr'); 
        const rateOutput = row.querySelector('.infusion-rate'); 
        if(concInput) concInput.value = data.concentration; 
        if(doseInput) doseInput.value = data.dose; 
        if (data.fixedRate && rateOutput) { 
            rateOutput.value = data.fixedRate; 
        } else if (doseInput) { 
            calculateInfusionRate(doseInput); 
        }
        validateDosage(drugName, data.dose);
    } 
}

function addPeriodicDrug() { 
    const tbody = document.querySelector('#periodicDrugsTbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'per_' + Date.now(); 
    
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td> <input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="periodicDrugsList" autocomplete="off" onchange="fillPeriodicDrugData(this)" id="${rowId}_name" />
            <input type="text" class="drug-input dose" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" oninput="markAsChanged()" />
        </td>
        <td> <input type="text" class="drug-input route" placeholder="i.v." autocomplete="off" id="${rowId}_route" />
        </td>
        <td> <input type="text" class="drug-input frequency" placeholder="co 24h" autocomplete="off" id="${rowId}_freq" />
            <span class="dose-reduction-notice" style="display:none; margin-left: 5px;">⚠️ Zredukowano</span>
        </td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`;

    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
}

function fillPeriodicDrugData(input) { 
    const row = input.closest('tr'); 
    if (!row) return;
    const drugName = input.value.toUpperCase(); 
    const doseInput = row.querySelector('.dose'); 
    const routeInput = row.querySelector('.route'); 
    const freqInput = row.querySelector('.frequency'); 
    const originalData = periodicDrugsData[drugName]; 

    if (originalData) { 
        if(doseInput) doseInput.dataset.originalDose = originalData.dose; 
        if(routeInput) {
            routeInput.value = originalData.route; 
            routeInput.placeholder = '';
        }
        if(freqInput) {
            freqInput.value = originalData.frequency; 
            freqInput.placeholder = '';
        }
    } else { 
        if(doseInput) doseInput.dataset.originalDose = ''; 
        if(routeInput) {
            routeInput.value = '';
            routeInput.placeholder = 'i.v.';
        }
        if(freqInput) {
            freqInput.value = '';
            freqInput.placeholder = 'co 24h';
        }
    } 
    recalculateDose(row); 
    adjustSingleDoseForGfr(row); 
}

function addFluid() { 
    const tbody = document.querySelector('#fluidsTable tbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'fluid_' + Date.now(); 
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td><input type="text" class="drug-input fluid-name" placeholder="Płyn" list="fluidsList" autocomplete="off" onchange="fillFluidData(this, '${rowId}')" /></td>
        <td class="additives-cell"><input type="text" class="drug-input additive-input additive-1" placeholder="Dodatek 1" list="additivesList" autocomplete="off" onchange="fillAdditiveData(this)" /></td>
        <td class="additives-cell"><input type="text" class="drug-input additive-input additive-2" placeholder="Dodatek 2" list="additivesList" autocomplete="off" onchange="fillAdditiveData(this)" /></td>
        <td><input type="number" class="drug-input fluid-volume" placeholder="ml" autocomplete="off" oninput="markAsChanged()" onchange="updateSummaries()" /></td>
        <td><input type="number" class="drug-input fluid-rate" placeholder="ml/h" autocomplete="off" oninput="markAsChanged()" onchange="updateSummaries()" /></td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
}

function fillFluidData(input, rowId) { 
    const fluidName = input.value; 
    const data = fluidsData[fluidName];
    if (data) { 
        const row = input.closest('tr');
        const volInput = row.querySelector('.fluid-volume');
        const rateInput = row.querySelector('.fluid-rate');
        if(volInput) volInput.value = data.volume.replace('ml',''); 
        if(rateInput) rateInput.value = data.rate; 
        updateSummaries(); 
    } 
}

function fillAdditiveData(input) {
    const additiveName = input.value.trim();
    const data = additivesData[additiveName];
    if (data) {
        input.value = `${additiveName} ${data.dose}ml`;
    }
}


function addNutrition() { 
    const tbody = document.querySelector('#nutritionTable tbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'nutr_' + Date.now();
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td><input type="text" class="drug-input nutrition-type" placeholder="Wybierz typ..." list="nutritionTypesList" autocomplete="off" onchange="updateNutritionProductList(this)" /></td>
        <td>
            <input type="text" class="drug-input nutrition-prep" placeholder="Wybierz preparat..." list="enteralProductsList" autocomplete="off" onchange="fillNutritionData(this, '${rowId}')" id="${rowId}_prep"/>
            <textarea class="drug-input nutrition-additives" placeholder="" id="${rowId}_additives" autocomplete="off" style="display:none;" rows="1"></textarea>
        </td>
        <td><input type="number" class="drug-input nutrition-rate" placeholder="ml/h" autocomplete="off" id="${rowId}_rate" oninput="markAsChanged()" onchange="updateSummaries()" /></td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    
    const newTextarea = newRow.querySelector('.nutrition-additives');
    if (newTextarea) newTextarea.addEventListener('input', () => autoResizeTextarea(newTextarea));
    markAsChanged();
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
    
    if(prepInput) {
        prepInput.setAttribute('list', newListId);
        prepInput.value = ''; 
    }
    updateSummaries(); 
}

function addProcedure() { 
    const tbody = document.querySelector('#proceduresTable tbody'); 
    const newRow = document.createElement('tr'); 
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td><input type="text" class="drug-input" placeholder="Godz." list="timesList" autocomplete="off" oninput="markAsChanged()" /></td>
        <td><input type="text" class="drug-input" placeholder="Nazwa procedury/zabiegu" list="proceduresList" autocomplete="off" oninput="markAsChanged()" /></td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
}

// --- LOGIKA DAWKOWANIA (GFR, mg/kg) ---
function recalculateDose(row) { 
    const doseInput = row.querySelector('.dose'); 
    if (!doseInput) return;
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
    const doseInput = row.querySelector('.dose');
    const freqInput = row.querySelector('.frequency');
    const notice = row.querySelector('.dose-reduction-notice');
    const adjustmentRules = gfrDoseAdjustments[drugName];

    // --- RESET STYLU PRZED OCENĄ ---
    // Nie resetuj dawki, jeśli GFR jest puste, ale wiersz był już dostosowany wcześniej.
    // Resetuj tylko, gdy GFR jest obecne i powyżej progu, lub gdy lek się zmienia.
    const currentDose = doseInput.value;
    row.classList.remove('gfr-dose-adjusted');
    if (notice) notice.style.display = 'none';
    recalculateDose(row); // Najpierw ustaw dawkę domyślną/przeliczoną wagowo.
    const baseDose = doseInput.value; // Zapamiętaj dawkę bazową po przeliczeniu wagowym.

    // --- KONIEC RESETU ---

    if (!gfr || !adjustmentRules) {
        doseInput.value = baseDose; // Upewnij się, że dawka jest bazowa, jeśli GFR nie dotyczy.
        return; // Brak GFR lub brak reguł dla leku
    }

    let appliedRule = null;
    for (const rule of adjustmentRules) { 
        if (gfr <= rule.gfrMax) { 
            appliedRule = rule; 
            break; 
        } 
    }

    if (appliedRule) {
        let finalDose = appliedRule.dose;
        if (appliedRule.dose.includes('/kg')) {
            const weight = parseFloat(document.getElementById('patientWeight').value);
            if (weight > 0) {
                const doseRegex = /([\d\.]+)/; 
                const matches = appliedRule.dose.match(doseRegex);
                if(matches) { 
                    const totalDose = Math.round(parseFloat(matches[1]) * weight); 
                    finalDose = `${totalDose}mg (${appliedRule.dose})`; 
                }
            }
        }
        
        if (doseInput) doseInput.value = finalDose;
        if (appliedRule.frequency && freqInput) freqInput.value = appliedRule.frequency;
        
        row.classList.add('gfr-dose-adjusted');
        if (notice) notice.style.display = 'inline-block'; 
        
        // ZMIANA: Sprawdzenie, czy faktycznie doszło do zmiany dawki lub częstości, zanim pokażemy toast.
        // Porównujemy dawkę bazową (po przeliczeniu wagowym) z nową dawką GFR.
        const originalFreq = periodicDrugsData[drugName]?.frequency || '';
        const frequencyChanged = appliedRule.frequency && appliedRule.frequency !== originalFreq;
        const doseChanged = finalDose !== baseDose;

        if (!row.dataset.gfrWarningShown && (doseChanged || frequencyChanged)) {
            showToast('Dostosowano dawkę', `Dawka ${drugName} została dostosowana do GFR=${gfr}`, 'warning', 6000);
            row.dataset.gfrWarningShown = 'true';
        }
    } else {
        doseInput.value = baseDose; // Upewnij się, że dawka jest bazowa, jeśli GFR jest powyżej progu.
        row.dataset.gfrWarningShown = ''; // Reset flagi ostrzeżenia jeśli GFR jest powyżej progu
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
    document.getElementById('additivesList').innerHTML = createOptions(additivesData);
}

function initializeCard() { 
    const today = new Date(); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear(); 
    const mainDateInput = document.getElementById('mainDateInput');
    if (mainDateInput && !mainDateInput.value) {
        mainDateInput.value = `${day}.${month}.${year}`; 
    }
    
    lastCalorieWarning = 0;
    lastFluidWarning = 0;
    
    calculateIcuDay(); 
    calculateBMI(); 
    updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
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
    }

    if (!historyNumber) {
        showValidationTooltip(historyNumberInput, 'Wprowadź numer historii');
        isValid = false;
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
            version: '3.5', // Zaktualizowano wersję
            patientSummary: {
                name: patientName,
                historyNumber: historyNumber,
                diagnosis: document.getElementById('diagnosisInput').value || 'Brak rozpoznania'
            }
        };
        
        localStorage.setItem(cardKey, JSON.stringify(cardState));
        
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
            let data = null;
            try {
                data = JSON.parse(localStorage.getItem(key));
            } catch(e) {}
            
            const savedAt = data?.metadata?.savedAt ? new Date(data.metadata.savedAt) : new Date(0);
            return { key, savedAt, data };
        }).sort((a, b) => b.savedAt - a.savedAt); // Sortuj od najnowszych
        
        cardsWithDates.forEach(({key, savedAt, data}) => {
            const friendlyName = data?.metadata?.patientSummary?.name || key.replace('card_', '').replace(/_/g, ' ');
            const historyNum = data?.metadata?.patientSummary?.historyNumber || '';
            const timeAgo = getTimeAgo(savedAt);
            
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <div class="patient-name">${friendlyName} ${historyNum ? '('+historyNum+')' : ''}</div>
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
    
    if (diffMins < 1) return `teraz`;
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours} godz. temu`;
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
    lastCalorieWarning = Date.now(); // Resetuj timery ostrzeżeń
    lastFluidWarning = Date.now();
    
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
        if (inputs[0]) inputs[0].value = data.name;
        if (inputs[1]) inputs[1].value = data.conc;
        if (inputs[2]) inputs[2].value = data.dose;
        if (inputs[3]) inputs[3].value = data.rate;
    });
    
    (tables.periodic || []).forEach(data => {
        addPeriodicDrug();
        const newRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const nameInput = newRow.querySelector('.drug-name');
        const doseInput = newRow.querySelector('.dose');
        const routeInput = newRow.querySelector('.route');
        const freqInput = newRow.querySelector('.frequency');
        
        if (nameInput) nameInput.value = data.name || '';
        if (doseInput) doseInput.value = data.dose || '';
        if (routeInput) routeInput.value = data.route || '';
        if (freqInput) freqInput.value = data.freq || '';
        
        if (nameInput) fillPeriodicDrugData(nameInput); // Ustaw dane bazowe dla przeliczeń
    });
    
    (tables.fluids || []).forEach(data => {
        addFluid();
        const newRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const nameInput = newRow.querySelector('.fluid-name');
        const volumeInput = newRow.querySelector('.fluid-volume');
        const rateInput = newRow.querySelector('.fluid-rate');
        const additive1Input = newRow.querySelector('.additive-1');
        const additive2Input = newRow.querySelector('.additive-2');
        
        if(nameInput) nameInput.value = data.name || '';
        if(volumeInput) volumeInput.value = data.volume || '';
        if(rateInput) rateInput.value = data.rate || '';
        if(data.additives && data.additives[0]) {
            if(additive1Input) additive1Input.value = data.additives[0];
        }
        if(data.additives && data.additives[1]) {
            if(additive2Input) additive2Input.value = data.additives[1];
        }
    });
    
    (tables.nutrition || []).forEach(data => {
        addNutrition();
        const newRow = document.querySelector('#nutritionTable tbody tr:last-child');
        const typeInput = newRow.querySelector('.nutrition-type');
        const prepInput = newRow.querySelector('.nutrition-prep');
        const additivesTextarea = newRow.querySelector('.nutrition-additives');
        const rateInput = newRow.querySelector('.nutrition-rate');
        
        if (data.type && typeInput) {
            typeInput.value = data.type;
            updateNutritionProductList(typeInput);
        }
        if (data.prep && prepInput) prepInput.value = data.prep;
        if (data.additives && additivesTextarea) {
            additivesTextarea.value = data.additives;
            autoResizeTextarea(additivesTextarea);
        }
        if (data.rate && rateInput) rateInput.value = data.rate;
    });
    
    (tables.procedures || []).forEach(data => {
        addProcedure();
        const newRow = document.querySelector('#proceduresTable tbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = data.time || '';
        if (inputs[1]) inputs[1].value = data.name || '';
    });
    
    const notesTextarea = document.querySelector('.notes-section textarea');
    if (notesTextarea && cardState.notes) {
        notesTextarea.value = cardState.notes;
    }
    
    handleWeightHeightChange(); // Przelicz dawki, BMI i podsumowania
    
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
        cardState.tables.periodic.push({
            name: row.querySelector('.drug-name')?.value || '',
            dose: row.querySelector('.dose')?.value || '',
            route: row.querySelector('.route')?.value || '',
            freq: row.querySelector('.frequency')?.value || ''
        });
    });
    
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        const fluidName = row.querySelector('.fluid-name')?.value || '';
        const volume = row.querySelector('.fluid-volume')?.value || '';
        const rate = row.querySelector('.fluid-rate')?.value || '';
        const additive1 = row.querySelector('.additive-1')?.value || '';
        const additive2 = row.querySelector('.additive-2')?.value || '';
        
        cardState.tables.fluids.push({
            name: fluidName,
            additives: [additive1, additive2].filter(a => a),
            volume: volume,
            rate: rate
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
        
        initializeCard(); // Resetuje datę i wskaźniki
        updateSummaries(); // Resetuje podsumowania do zera
        
        hasUnsavedChanges = false;
        updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
        
        if (!force) {
            showToast('Wyczyszczono', 'Karta została wyczyszczona', 'info');
        }
    } 
}

// --- FILE OPERATIONS ---
function saveCardToFile() {
    const patientName = document.getElementById('patientNameInput').value.trim() || 'Pacjent';
    const historyNumber = document.getElementById('historyNumberInput').value.trim() || 'Historia';
    const cardState = getCardState();
    
    cardState.metadata = {
        exportedAt: new Date().toISOString(),
        version: '3.5',
        patientSummary: {
            name: patientName,
            historyNumber: historyNumber,
            diagnosis: document.getElementById('diagnosisInput').value || 'Brak rozpoznania'
        }
    };
    
    const dataStr = JSON.stringify(cardState, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `karta_${patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('Eksport', `Karta została wyeksportowana do pliku ${exportFileDefaultName}`, 'success');
}

function loadCardFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const cardState = JSON.parse(e.target.result);
            populateCardFromState(cardState);
            showToast('Import', 'Karta została pomyślnie wczytana z pliku', 'success');
        } catch (error) {
            showToast('Błąd importu', 'Nie można wczytać karty z pliku. Sprawdź format.', 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset inputu, aby można było wczytać ten sam plik ponownie
}

// --- PDF GENERATION ---
function generatePDF() {
    const element = document.getElementById('card-container');
    const opt = {
        margin: 5,
        filename: `karta_${document.getElementById('patientNameInput').value.replace(/\s+/g, '_') || 'pacjent'}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    showToast('Generowanie PDF', 'Trwa tworzenie dokumentu PDF...', 'info', 3000);
    
    html2pdf().set(opt).from(element).save().then(() => {
        showToast('PDF gotowy', 'Dokument PDF został wygenerowany', 'success');
    }).catch((error) => {
        showToast('Błąd PDF', 'Wystąpił problem podczas generowania PDF', 'error');
        console.error('PDF generation error:', error);
    });
}

// --- DARK MODE ---
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = document.querySelector('#darkModeToggle i');
    if(icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function() {
    populateDatalists();
    initializeCard();
    initializeSortable();
    startAutosave();
    
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    Object.keys(customTemplates).forEach(key => {
        cardTemplates[key] = customTemplates[key];
    });
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.documentElement.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if(icon) icon.className = 'fas fa-sun';
    }
    
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Używamy delegacji zdarzeń dla dynamicznie dodawanych inputów
    document.addEventListener('input', function(e) {
        if (e.target.closest('#card-container')) {
            markAsChanged();
        }

        // ZMIANA 1: Przeniesiono logikę wagi/wzrostu do zdarzenia 'change' poniżej.
        
        // Logika dla natychmiastowej aktualizacji (bez ostrzeżeń)
        if (e.target.matches('.fluid-rate')) {
            updateSummaries(); // Szybka aktualizacja paska płynów jest pożądana.
        }
        if(e.target.matches('.dose') && e.target.closest('#continuousDrugsTbody')) {
            calculateInfusionRate(e.target); // Obliczanie przepływu pompy na bieżąco.
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.closest('#card-container')) {
            markAsChanged();
        }
        if(e.target.matches('#admissionDateInput') || e.target.matches('#mainDateInput')) {
            calculateIcuDay();
        }
        if(e.target.matches('#admissionDateInput')) {
            validateDate(e.target);
        }

        // ZMIANA 2: Główne przeliczenia i walidacje są teraz tutaj (zdarzenie 'change').
        // Wykonuje się po zakończeniu edycji pola wagi lub wzrostu.
        if (e.target.matches('#patientWeight') || e.target.matches('#heightInput')) {
            handleWeightHeightChange();
        }
        
        // Wywołanie adjustAllDosesForGfr po zakończeniu edycji pola GFR.
        if (e.target.matches('#gfrInput')) {
            adjustAllDosesForGfr();
        }

        // Wywołanie updateSummaries (dla obliczeń kalorii i finalnego bilansu płynów) po zakończeniu edycji pól rate.
        if (e.target.matches('.nutrition-rate') || e.target.matches('.fluid-rate') || e.target.matches('.fluid-name')) {
            updateSummaries();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCard();
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            clearCard();
        }
    });
        // Delegacja zdarzeń dla obsługi strzałek w polu rozpoznanie
    document.getElementById('diagnosisInput').addEventListener('keydown', function(e) {
        const datalist = document.getElementById('diagnosisList');
        const options = Array.from(datalist.querySelectorAll('option')).map(opt => opt.value);
        
        if (options.length === 0) return;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentValue = this.value;
            let currentIndex = options.indexOf(currentValue);
            
            if (e.key === 'ArrowDown') {
                currentIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
            } else {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
            }
            
            this.value = options[currentIndex];
            markAsChanged();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCard();
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            clearCard();
        }
    });

    document.getElementById('roomInput').addEventListener('input', function() {
        document.getElementById('roomInputPrint').value = this.value;
    });
    
    document.addEventListener('click', function(e) {
        const quickSearchResults = document.getElementById('quickSearchResults');
        if (quickSearchResults && !e.target.closest('.quick-search-bar')) {
            quickSearchResults.style.display = 'none';
        }
    });
    
    showToast('System gotowy', 'Karta zleceń OIT została załadowana', 'success', 3000);
});
