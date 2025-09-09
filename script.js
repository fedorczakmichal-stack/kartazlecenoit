// --- ENHANCED MEDICAL CARD SYSTEM v3.6 (Ulepszona wersja z nowymi lekami i szablonami) ---

// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = {
    'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-1.0 μg/kg/min' },
    'NOREPINEFRYNA 4mg': { concentration: '4mg/50ml', dose: '0.05-0.5 μg/kg/min' },
    'NOREPINEFRYNA 0.5mg/ml': { concentration: '0.5mg/ml', dose: '0.05-0.5 μg/kg/min' },
    'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 μg/kg/min' },
    'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 μg/kg/min' },
    'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 μg/kg/min' },
    'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min' },
    'LEVOSIMENDAN': { concentration: '12.5mg/5ml (w 500ml 5% Glc)', dose: '0.05-0.2 μg/kg/min' },
    'EPOPROSTENOL': { concentration: '1.5mg/50ml', dose: '2-10 ng/kg/min' },
    'MILRYNON': { concentration: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' },
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
    'NITROPRUSYDEK SODU': { concentration: '50mg/50ml', dose: '0.5-8 μg/kg/min' },
    'KLONIDYNA': { concentration: '150μg/50ml', dose: '0.5-2 μg/kg/h' },
    'LABETALOL': { concentration: '100mg/50ml', dose: '0.5-2 mg/min' },
    'ESMOLOL': { concentration: '2500mg/50ml', dose: '50-200 μg/kg/min' },
    'DILTIAZEM': { concentration: '125mg/50ml', dose: '5-15 mg/h' },
    'MAGNEZ': { concentration: '2g/20ml', dose: '1-2 g/h' },
    'BIKARBONIAN SODU': { concentration: '100ml 8.4%', dose: '20-50 ml/h' },
    'OKTREOTYD': { concentration: '500μg/50ml', dose: '25-50 μg/h' },
    'ATROPINA (WLEW CIĄGŁY)': { concentration: '20mg/20ml', dose: '0.01-0.02 mg/kg/h' },
    // Nowe leki
    'CEFTAZYDYMEK/AVIBAKTAM': { concentration: '2g/0.5g/100ml', dose: '2g/0.5g co 8h (wlew 2h)' },
    'LEWETYRACETAM': { concentration: '500mg/100ml', dose: '500-1000 mg/h' },
    'KALCYTONINA': { concentration: '100j/50ml', dose: '4-8 j/kg/h' },
    'CYTRYNIAN SODU 4%': { concentration: '4%/1000ml', dose: '100-200 ml/h' }
};

const periodicDrugsData = {
    'AMOKSYCYLINA/KWAS KLAWULANOWY': { dose: '1.2g', route: 'i.v.', frequency: 'co 8h' },
    'AMIKACYNA': { dose: '15-20mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'AZITHROMYCYNA': { dose: '500mg', route: 'i.v. wlew 1h', frequency: 'co 24h' },
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
    'OSELTAMIWIR': { dose: '75mg', route: 'p.o./i.v.', frequency: 'co 12h' },
    'WALACYKLOWIR': { dose: '1g', route: 'p.o./i.v.', frequency: 'co 8-12h' },
    'RIFAMPICYNA': { dose: '600mg', route: 'i.v./p.o.', frequency: 'co 24h' },
    'REMIMAZOLAM': { dose: '5-10mg', route: 'i.v.', frequency: 'na zlecenie' },
    'SUGAMMADEKS': { dose: '2-4mg/kg', route: 'i.v.', frequency: 'jednorazowo' },
    'NEOSTYGMINA': { dose: '2.5mg', route: 'i.v.', frequency: 'jednorazowo' },
    'ATROPINA': { dose: '0.5-1mg', route: 'i.v.', frequency: 'doraźnie' },
    'FENTANYL': { dose: '50-100μg', route: 'i.v.', frequency: 'na zlecenie' },
    'KETAMINA': { dose: '0.5mg/kg', route: 'i.v.', frequency: 'na zlecenie' },
    'TRANEKSAM': { dose: '1g', route: 'i.v.', frequency: 'co 8h' },
    'PROTAMINA': { dose: '1mg/100j heparyny', route: 'i.v. wolno', frequency: 'jednorazowo' },
    'WITAMINA K': { dose: '10mg', route: 'i.v. wolno', frequency: 'co 24h' },
    'TIAMINA': { dose: '100mg', route: 'i.v.', frequency: 'co 24h' },
    'PIRYDOKSYNA': { dose: '50mg', route: 'i.v.', frequency: 'co 24h' },
    'KWAS FOLIOWY': { dose: '5mg', route: 'p.o.', frequency: 'co 24h' },
    'BIOTYNA': { dose: '300μg', route: 'p.o.', frequency: 'co 24h' },
    // Nowe leki
    'CEFIDEROCOL': { dose: '2g', route: 'i.v. wlew 3h', frequency: 'co 8h' },
    'ACYCLOVIR': { dose: '5-10 mg/kg', route: 'i.v. wlew 1h', frequency: 'co 8h' },
    'HYDROMORFON': { dose: '1-2 mg', route: 'i.v./s.c.', frequency: 'co 4-6h' },
    'ONDANSETRON': { dose: '8 mg', route: 'i.v.', frequency: 'co 8h' }
};

const fluidsData = {
    'NaCl 0.9%': { volume: '500ml', rate: '50' },
    'Plasmalyte': { volume: '500ml', rate: '50' },
    'Optilyte': { volume: '500ml', rate: '50' },
    'Płyn Ringera': { volume: '500ml', rate: '50' },
    'Glukoza 5%': { volume: '500ml', rate: '40' },
    'Glukoza 10%': { volume: '500ml', rate: '30' },
    'Gelofusine': { volume: '500ml', rate: '100' },
    'Albuminy 20%': { volume: '100ml', rate: '50' },
    'Albuminy 5%': { volume: '250ml', rate: '100' },
    'Mannitol 15%': { volume: '250ml', rate: '125' },
    'NaHCO3 8.4%': { volume: '100ml', rate: '50' }
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

const cardTemplates = {
    'Uniwersalny OIT': {
        tables: {
            continuous: [
                { name: 'NORADRENALINA', conc: '0.5mg/ml', dose: '0.05-0.5 μg/kg/min' },
                { name: 'PROPOFOL 1%', conc: '10mg/ml', dose: '2-3 mg/kg/h' },
                { name: 'FENTANYL', conc: '500μg/50ml', dose: '50-100 μg/h' },
                { name: 'PANTOPRAZOL', conc: '80mg/100ml', dose: '4.2 ml/h', fixedRate: '4.2' }
            ],
            periodic: [
                { name: 'CEFTAZYDYMEK/AVIBAKTAM', dose: '2g/0.5g', route: 'i.v. wlew 2h', freq: 'co 8h' },
                { name: 'ENOKSAPARYNA', dose: '40mg', route: 's.c.', freq: 'co 24h' },
                { name: 'LEWETYRACETAM', dose: '500mg', route: 'i.v.', freq: 'co 12h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '1000ml', rate: '80' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Sprawdź GFR i dostosuj dawki antybiotyków.'
    },
    'Sepsa': {
        tables: {
            continuous: [
                { name: 'NORADRENALINA', conc: '0.5mg/ml', dose: '0.05-0.5 μg/kg/min' },
                { name: 'PIPERACYLINA/TAZOBAKTAM', conc: '18g/100ml', dose: 'wlew 24h', fixedRate: '4.2' }
            ],
            periodic: [
                { name: 'WANKOMYCYNA', dose: '1g', route: 'i.v. wlew 1h', freq: 'co 12h' },
                { name: 'CEFIDEROCOL', dose: '2g', route: 'i.v. wlew 3h', freq: 'co 8h' },
                { name: 'HYDROKORTYZON', dose: '50mg', route: 'i.v.', freq: 'co 6h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '1000ml', rate: '100' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Kontroluj źródło infekcji, weź posiewy, monitoruj poziomy Wankomycyny.'
    },
    'Kardiochirurgia': {
        tables: {
            continuous: [
                { name: 'NORADRENALINA', conc: '0.5mg/ml', dose: '0.05-0.5 μg/kg/min' },
                { name: 'MILRYNON', conc: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' },
                { name: 'AMIODARON', conc: '300mg/50ml 5% Glc', dose: '20-50 mg/h' }
            ],
            periodic: [
                { name: 'CEFUROKSYM', dose: '1.5g', route: 'i.v.', freq: 'co 8h' },
                { name: 'ENOKSAPARYNA', dose: '40mg', route: 's.c.', freq: 'co 24h' }
            ],
            fluids: [
                { name: 'Albuminy 5%', additives: '', volume: '250ml', rate: '100' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Monitoruj EKG i ciśnienie.'
    },
    'Uraz wielonarządowy': {
        tables: {
            continuous: [
                { name: 'FENTANYL', conc: '500μg/50ml', dose: '50-100 μg/h' },
                { name: 'NORADRENALINA', conc: '0.5mg/ml', dose: '0.05-0.5 μg/kg/min' }
            ],
            periodic: [
                { name: 'MANNITOL 15%', dose: '100ml', route: 'i.v.', freq: 'co 6h' },
                { name: 'ENOKSAPARYNA', dose: '40mg', route: 's.c.', freq: 'co 24h' },
                { name: 'PANTOPRAZOL', dose: '40mg', route: 'i.v.', freq: 'co 24h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '1000ml', rate: '80' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Monitoruj ciśnienie śródczaszkowe.'
    },
    'Niewydolność oddechowa': {
        tables: {
            continuous: [
                { name: 'SALBUTAMOL', conc: '5mg/50ml', dose: '3-20 μg/min' }
            ],
            periodic: [
                { name: 'METYLOPREDNIZOLON', dose: '125mg', route: 'i.v.', freq: 'co 24h' },
                { name: 'IPRATROPIUM', dose: '0.5mg', route: 'nebulizacja', freq: 'co 6-8h' },
                { name: 'MAGNEZ', dose: '2g', route: 'i.v.', freq: 'co 6h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '500ml', rate: '50' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Monitoruj saturację i gazometrię.'
    },
    'Neurologia': {
        tables: {
            continuous: [
                { name: 'PROPOFOL 1%', conc: '10mg/ml', dose: '2-3 mg/kg/h' },
                { name: 'LEWETYRACETAM', conc: '500mg/100ml', dose: '500-1000 mg/h' }
            ],
            periodic: [
                { name: 'MANNITOL 15%', dose: '100ml', route: 'i.v.', freq: 'co 6h' },
                { name: 'PIRACETAM', dose: '4.8g', route: 'i.v.', freq: 'co 12h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '500ml', rate: '50' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Monitoruj neurologię i EEG.'
    },
    'CRRT': {
        tables: {
            continuous: [
                { name: 'CYTRYNIAN SODU 4%', conc: '4%/1000ml', dose: '100-200 ml/h' },
                { name: 'KALCYTONINA', conc: '100j/50ml', dose: '4-8 j/kg/h' }
            ],
            periodic: [
                { name: 'WANKOMYCYNA', dose: '1g', route: 'i.v. wlew 1h', freq: 'co 12h' },
                { name: 'CEFIDEROCOL', dose: '2g', route: 'i.v. wlew 3h', freq: 'co 8h' }
            ],
            fluids: [
                { name: 'NaCl 0.9%', additives: '', volume: '1000ml', rate: '80' }
            ],
            nutrition: [],
            procedures: []
        },
        notes: 'Monitoruj potas, wapń, poziomy antybiotyków, dostosuj do cytrynianowego CRRT.'
    }
};

// --- FUNKCJE POMOCNICZE ---
function populateDatalists() {
    const continuousDrugList = document.getElementById('continuousDrugList');
    if (continuousDrugList) {
        continuousDrugList.innerHTML = '';
        Object.keys(continuousDrugsData).forEach(drug => {
            const option = document.createElement('option');
            option.value = drug;
            continuousDrugList.appendChild(option);
        });
    }
    const periodicDrugList = document.getElementById('periodicDrugList');
    if (periodicDrugList) {
        periodicDrugList.innerHTML = '';
        Object.keys(periodicDrugsData).forEach(drug => {
            const option = document.createElement('option');
            option.value = drug;
            periodicDrugList.appendChild(option);
        });
    }
}

function saveTemplates() {
    localStorage.setItem('customTemplates', JSON.stringify(cardTemplates));
}

function populateCardFromTemplate(templateName) {
    const template = cardTemplates[templateName];
    if (!template) return;
    clearCard(true);
    template.tables.continuous.forEach(data => {
        addContinuousDrug();
        const newRow = document.querySelector('#continuousDrugsTbody tr:last-child');
        const nameInput = newRow.querySelector('.drug-name');
        const concInput = newRow.querySelector('.conc');
        const doseInput = newRow.querySelector('.dose');
        const rateInput = newRow.querySelector('.rate');
        if (nameInput) nameInput.value = data.name || '';
        if (concInput) concInput.value = data.conc || '';
        if (doseInput) doseInput.value = data.dose || '';
        if (rateInput) rateInput.value = data.rate || '';
    });
    template.tables.periodic.forEach(data => {
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
    });
    template.tables.fluids.forEach(data => {
        addFluid();
        const newRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = data.name;
        if (inputs[1]) inputs[1].value = data.additives || '';
        if (inputs[2]) inputs[2].value = data.volume || '';
        if (inputs[3]) inputs[3].value = data.rate || '';
    });
    template.tables.nutrition.forEach(data => {
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
    template.tables.procedures.forEach(data => {
        addProcedure();
        const newRow = document.querySelector('#proceduresTable tbody tr:last-child');
        const inputs = newRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = data.time || '';
        if (inputs[1]) inputs[1].value = data.name || '';
    });
    const notesTextarea = document.querySelector('#notes');
    if (notesTextarea && template.notes) {
        notesTextarea.value = template.notes;
    }
    updateSummaries();
    hasUnsavedChanges = false;
    updateAutosaveIndicator('saved', 'Szablon wczytany');
}

function addContinuousDrug() {
    const tbody = document.getElementById('continuousDrugsTbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="drug-input drug-name" list="continuousDrugList" oninput="markAsChanged(); updateRate(this)"></td>
        <td><input type="text" class="drug-input conc" oninput="markAsChanged(); updateRate(this)"></td>
        <td><input type="text" class="drug-input dose" oninput="markAsChanged(); updateRate(this)"></td>
        <td><input type="text" class="drug-input rate infusion-rate" oninput="markAsChanged()"></td>
        <td class="signature-box-cell"><input type="text" class="drug-input sig"></td>
        <td><button class="remove-button" onclick="removeRow(this, 'continuousDrugsTable')">-</button></td>
    `;
    tbody.appendChild(row);
}

function addPeriodicDrug() {
    const tbody = document.getElementById('periodicDrugsTbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="drug-input drug-name" list="periodicDrugList" oninput="markAsChanged()"></td>
        <td><input type="text" class="drug-input dose" oninput="markAsChanged()"></td>
        <td><input type="text" class="drug-input route" oninput="markAsChanged()"></td>
        <td><input type="text" class="drug-input frequency" oninput="markAsChanged()"></td>
        <td class="signature-box-cell"><input type="text" class="drug-input sig"></td>
        <td><button class="remove-button" onclick="removeRow(this, 'periodicDrugsTable')">-</button></td>
    `;
    tbody.appendChild(row);
}

function addFluid() {
    const tbody = document.getElementById('fluidsTbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="drug-input fluid-name" list="fluidList" oninput="markAsChanged(); updateSummaries()"></td>
        <td><input type="text" class="drug-input additives-input" oninput="markAsChanged()"></td>
        <td><input type="text" class="drug-input fluid-volume" oninput="markAsChanged(); updateSummaries()"></td>
        <td><input type="text" class="drug-input fluid-rate" oninput="markAsChanged(); updateSummaries()"></td>
        <td class="signature-box-cell"><input type="text" class="drug-input sig"></td>
        <td><button class="remove-button" onclick="removeRow(this, 'fluidsTable')">-</button></td>
    `;
    const fluidList = document.createElement('datalist');
    fluidList.id = 'fluidList';
    Object.keys(fluidsData).forEach(fluid => {
        const option = document.createElement('option');
        option.value = fluid;
        fluidList.appendChild(option);
    });
    tbody.appendChild(row);
    document.body.appendChild(fluidList);
}

function addNutrition() {
    const tbody = document.getElementById('nutritionTbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <select class="drug-input nutrition-type" oninput="markAsChanged(); updateNutritionProductList(this); updateSummaries()">
                <option value="dojelitowe">Dojelitowe</option>
                <option value="pozajelitowe">Pozajelitowe</option>
            </select>
        </td>
        <td>
            <input type="text" class="drug-input nutrition-prep" list="nutritionList" oninput="markAsChanged(); updateSummaries()">
            <textarea class="drug-input nutrition-additives" placeholder="Dodatki" oninput="markAsChanged(); autoResizeTextarea(this); updateSummaries()"></textarea>
        </td>
        <td><input type="text" class="drug-input nutrition-rate" oninput="markAsChanged(); updateSummaries()"></td>
        <td class="signature-box-cell"><input type="text" class="drug-input sig"></td>
        <td><button class="remove-button" onclick="removeRow(this, 'nutritionTable')">-</button></td>
    `;
    tbody.appendChild(row);
}

function addProcedure() {
    const tbody = document.getElementById('proceduresTbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="drug-input" oninput="markAsChanged()"></td>
        <td><input type="text" class="drug-input" oninput="markAsChanged()"></td>
        <td class="signature-box-cell"><input type="text" class="drug-input sig"></td>
        <td><button class="remove-button" onclick="removeRow(this, 'proceduresTable')">-</button></td>
    `;
    tbody.appendChild(row);
}

function removeRow(button, tableId) {
    button.closest('tr').remove();
    updateSummaries();
    markAsChanged();
}

function clearCard(full = false) {
    document.getElementById('continuousDrugsTbody').innerHTML = '';
    document.getElementById('periodicDrugsTbody').innerHTML = '';
    document.getElementById('fluidsTbody').innerHTML = '';
    document.getElementById('nutritionTbody').innerHTML = '';
    document.getElementById('proceduresTbody').innerHTML = '';
    document.getElementById('notes').value = '';
    if (full) {
        document.getElementById('patientNameInput').value = '';
        document.getElementById('peselInput').value = '';
        document.getElementById('historyNumberInput').value = '';
        document.getElementById('admissionDateInput').value = '';
        document.getElementById('patientWeight').value = '';
        document.getElementById('heightInput').value = '';
        document.getElementById('bmiInput').value = '';
        document.getElementById('diagnosisInput').value = '';
        document.getElementById('gfrInput').value = '';
        document.getElementById('roomInput').value = '';
        document.getElementById('roomInputPrint').value = '';
        document.getElementById('mainDateInput').value = '';
        document.getElementById('icuDayInput').value = '';
        document.getElementById('allergiesInput').value = '';
        document.getElementById('doctorNotes').value = '';
    }
    updateSummaries();
    markAsChanged();
}

function generatePDF() {
    const element = document.getElementById('card-container');
    const opt = {
        margin: [2, 2, 2, 2],
        filename: 'Karta_Zlecen_OIT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

function updateSummaries() {
    let fluidTotal = 0;
    let kcalTotal = 0;
    const patientWeight = parseFloat(document.getElementById('patientWeight').value) || 70;

    document.querySelectorAll('#fluidsTable .fluid-volume').forEach(input => {
        const volume = parseFloat(input.value.replace(/[^0-9.]/g, '')) || 0;
        const rate = parseFloat(input.closest('tr').querySelector('.fluid-rate').value) || 0;
        fluidTotal += volume * (rate / 24);
    });

    document.querySelectorAll('#nutritionTable .nutrition-prep').forEach(input => {
        const prep = input.value;
        const rate = parseFloat(input.closest('tr').querySelector('.nutrition-rate').value) || 0;
        if (nutritionData[prep]) {
            const kcalPerMl = nutritionData[prep].kcal / nutritionData[prep].volume;
            kcalTotal += kcalPerMl * rate * 24;
        }
    });

    document.querySelectorAll('#fluidsTable .fluid-name').forEach(input => {
        const fluid = input.value;
        const rate = parseFloat(input.closest('tr').querySelector('.fluid-rate').value) || 0;
        if (glucoseKcalData[fluid]) {
            kcalTotal += glucoseKcalData[fluid] * rate * 24;
        }
    });

    document.getElementById('fluidSum').textContent = `${Math.round(fluidTotal)} ml`;
    document.getElementById('kcalSum').textContent = `${Math.round(kcalTotal)} kcal (${(kcalTotal / patientWeight).toFixed(1)} kcal/kg)`;
}

function updateNutritionProductList(select) {
    const nutritionList = select.closest('tr').querySelector('.nutrition-prep').nextElementSibling;
    if (!nutritionList || nutritionList.tagName !== 'DATALIST') {
        const newDatalist = document.createElement('datalist');
        newDatalist.id = `nutritionList-${Math.random().toString(36).substr(2, 9)}`;
        select.closest('tr').querySelector('.nutrition-prep').setAttribute('list', newDatalist.id);
        select.closest('tr').appendChild(newDatalist);
    }
    const datalist = select.closest('tr').querySelector('datalist');
    datalist.innerHTML = '';
    const options = select.value === 'dojelitowe'
        ? ['Nutricomp Standard 500ml (1 kcal/ml)', 'Nutricomp Standard 1000ml (1 kcal/ml)', 'Nutricomp intensiv 500ml (1.5 kcal/ml)', 'Nutricomp intensiv 1000ml (1.5 kcal/ml)', 'Nutricomp Standard Fibre 500ml (1 kcal/ml)', 'Nutrison 500ml (1 kcal/ml)', 'Nutrison 1000ml (1 kcal/ml)', 'Nutrison 1500ml (1 kcal/ml)', 'Nutrison Advanced Peptisorb 500ml (1 kcal/ml)', 'Nutrison Advanced Peptisorb 1000ml (1 kcal/ml)', 'Nutrison Multi Fibre 500ml (1 kcal/ml)', 'Nutrison Multi Fibre 1000ml (1 kcal/ml)']
        : ['OMEGAFLEX PLUS 1250ml (1.3 kcal/ml)', 'OMEGAFLEX PLUS 1875ml (1.3 kcal/ml)', 'OMEGAFLEX SPECIAL 625ml (1.3 kcal/ml)', 'OMEGAFLEX SPECIAL 1250ml (1.3 kcal/ml)', 'OMEGAFLEX SPECIAL 1875ml (1.3 kcal/ml)', 'Nutriflex Peri 1000ml (1.2 kcal/ml)', 'Nutriflex Plus 1000ml (1.2 kcal/ml)', 'SmofKabiven 986ml (1.1 kcal/ml)', 'SmofKabiven 1477ml (1.1 kcal/ml)', 'SmofKabiven Extra NITROGEN 1012ml (1.2 kcal/ml)', 'SmofKabiven Extra NITROGEN 1518ml (1.2 kcal/ml)', 'SmofKabiven EF 986ml (1.1 kcal/ml)', 'SmofKabiven EF 1477ml (1.1 kcal/ml)', 'SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)', 'SmofKabiven LOW OSMO 1400ml (1.0 kcal/ml)', 'SmofKabiven LOW OSMO 1950ml (1.0 kcal/ml)', 'Aminomix 1 Novum 1000ml (0.8 kcal/ml)', 'Aminomix 1 Novum 1500ml (0.8 kcal/ml)'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        datalist.appendChild(opt);
    });
}

function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function showToast(title, message, type, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

function markAsChanged() {
    hasUnsavedChanges = true;
    updateAutosaveIndicator('unsaved', 'Niezapisane zmiany');
}

function updateAutosaveIndicator(status, message) {
    const indicator = document.getElementById('autosaveIndicator');
    indicator.className = `autosave-indicator ${status}`;
    indicator.innerHTML = `<i class="fas fa-${status === 'saving' ? 'spinner fa-spin' : status === 'saved' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
}

function saveCard() {
    const cardState = {
        patientName: document.getElementById('patientNameInput').value,
        pesel: document.getElementById('peselInput').value,
        historyNumber: document.getElementById('historyNumberInput').value,
        admissionDate: document.getElementById('admissionDateInput').value,
        weight: document.getElementById('patientWeight').value,
        height: document.getElementById('heightInput').value,
        diagnosis: document.getElementById('diagnosisInput').value,
        gfr: document.getElementById('gfrInput').value,
        room: document.getElementById('roomInput').value,
        roomPrint: document.getElementById('roomInputPrint').value,
        mainDate: document.getElementById('mainDateInput').value,
        icuDay: document.getElementById('icuDayInput').value,
        allergies: document.getElementById('allergiesInput').value,
        doctorNotes: document.getElementById('doctorNotes').value,
        continuousDrugs: Array.from(document.querySelectorAll('#continuousDrugsTbody tr')).map(row => ({
            name: row.querySelector('.drug-name').value,
            conc: row.querySelector('.conc').value,
            dose: row.querySelector('.dose').value,
            rate: row.querySelector('.rate').value
        })),
        periodicDrugs: Array.from(document.querySelectorAll('#periodicDrugsTbody tr')).map(row => ({
            name: row.querySelector('.drug-name').value,
            dose: row.querySelector('.dose').value,
            route: row.querySelector('.route').value,
            freq: row.querySelector('.frequency').value
        })),
        fluids: Array.from(document.querySelectorAll('#fluidsTbody tr')).map(row => ({
            name: row.querySelector('.fluid-name').value,
            additives: row.querySelector('.additives-input').value,
            volume: row.querySelector('.fluid-volume').value,
            rate: row.querySelector('.fluid-rate').value
        })),
        nutrition: Array.from(document.querySelectorAll('#nutritionTbody tr')).map(row => ({
            type: row.querySelector('.nutrition-type').value,
            prep: row.querySelector('.nutrition-prep').value,
            additives: row.querySelector('.nutrition-additives').value,
            rate: row.querySelector('.nutrition-rate').value
        })),
        procedures: Array.from(document.querySelectorAll('#proceduresTbody tr')).map(row => ({
            time: row.querySelector('input:nth-child(1)').value,
            name: row.querySelector('input:nth-child(2)').value
        })),
        notes: document.getElementById('notes').value
    };
    localStorage.setItem('cardState', JSON.stringify(cardState));
    hasUnsavedChanges = false;
    updateAutosaveIndicator('saved', 'Zapisano');
}

function loadCardFromBrowser() {
    const cardState = JSON.parse(localStorage.getItem('cardState') || '{}');
    if (!cardState) return;
    document.getElementById('patientNameInput').value = cardState.patientName || '';
    document.getElementById('peselInput').value = cardState.pesel || '';
    document.getElementById('historyNumberInput').value = cardState.historyNumber || '';
    document.getElementById('admissionDateInput').value = cardState.admissionDate || '';
    document.getElementById('patientWeight').value = cardState.weight || '';
    document.getElementById('heightInput').value = cardState.height || '';
    document.getElementById('diagnosisInput').value = cardState.diagnosis || '';
    document.getElementById('gfrInput').value = cardState.gfr || '';
    document.getElementById('roomInput').value = cardState.room || '';
    document.getElementById('roomInputPrint').value = cardState.roomPrint || '';
    document.getElementById('mainDateInput').value = cardState.mainDate || '';
    document.getElementById('icuDayInput').value = cardState.icuDay || '';
    document.getElementById('allergiesInput').value = cardState.allergies || '';
    document.getElementById('doctorNotes').value = cardState.doctorNotes || '';
    clearCard();
    (cardState.continuousDrugs || []).forEach(data => {
        addContinuousDrug();
        const row = document.querySelector('#continuousDrugsTbody tr:last-child');
        row.querySelector('.drug-name').value = data.name || '';
        row.querySelector('.conc').value = data.conc || '';
        row.querySelector('.dose').value = data.dose || '';
        row.querySelector('.rate').value = data.rate || '';
    });
    (cardState.periodicDrugs || []).forEach(data => {
        addPeriodicDrug();
        const row = document.querySelector('#periodicDrugsTbody tr:last-child');
        row.querySelector('.drug-name').value = data.name || '';
        row.querySelector('.dose').value = data.dose || '';
        row.querySelector('.route').value = data.route || '';
        row.querySelector('.frequency').value = data.freq || '';
    });
    (cardState.fluids || []).forEach(data => {
        addFluid();
        const row = document.querySelector('#fluidsTbody tr:last-child');
        row.querySelector('.fluid-name').value = data.name || '';
        row.querySelector('.additives-input').value = data.additives || '';
        row.querySelector('.fluid-volume').value = data.volume || '';
        row.querySelector('.fluid-rate').value = data.rate || '';
    });
    (cardState.nutrition || []).forEach(data => {
        addNutrition();
        const row = document.querySelector('#nutritionTbody tr:last-child');
        row.querySelector('.nutrition-type').value = data.type || '';
        updateNutritionProductList(row.querySelector('.nutrition-type'));
        row.querySelector('.nutrition-prep').value = data.prep || '';
        row.querySelector('.nutrition-additives').value = data.additives || '';
        row.querySelector('.nutrition-rate').value = data.rate || '';
        autoResizeTextarea(row.querySelector('.nutrition-additives'));
    });
    (cardState.procedures || []).forEach(data => {
        addProcedure();
        const row = document.querySelector('#proceduresTbody tr:last-child');
        row.querySelector('input:nth-child(1)').value = data.time || '';
        row.querySelector('input:nth-child(2)').value = data.name || '';
    });
    document.getElementById('notes').value = cardState.notes || '';
    updateSummaries();
    hasUnsavedChanges = false;
    updateAutosaveIndicator('saved', 'Wczytano zapisane dane');
}

function startAutosave() {
    setInterval(() => {
        if (hasUnsavedChanges) {
            updateAutosaveIndicator('saving', 'Zapisywanie...');
            saveCard();
        }
    }, 5000);
}

function handleWeightHeightChange() {
    const weight = parseFloat(document.getElementById('patientWeight').value) || 0;
    const height = parseFloat(document.getElementById('heightInput').value) || 0;
    const bmi = weight && height ? (weight / ((height / 100) ** 2)).toFixed(1) : '';
    document.getElementById('bmiInput').value = bmi;
    updateSummaries();
}

function updateRate(input) {
    const row = input.closest('tr');
    const name = row.querySelector('.drug-name').value;
    const drugData = continuousDrugsData[name];
    if (drugData && drugData.fixedRate) {
        row.querySelector('.rate').value = drugData.fixedRate;
    }
}

let hasUnsavedChanges = false;

// --- INICJALIZACJA ---
document.addEventListener('DOMContentLoaded', function() {
    populateDatalists();
    saveTemplates();
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    Object.assign(cardTemplates, customTemplates);
    document.getElementById('patientWeight').addEventListener('input', handleWeightHeightChange);
    document.getElementById('heightInput').addEventListener('input', handleWeightHeightChange);
    document.getElementById('templateSelect').addEventListener('change', () => {
        populateCardFromTemplate(document.getElementById('templateSelect').value);
    });
    document.getElementById('notes').addEventListener('input', markAsChanged);
    document.getElementById('doctorNotes').addEventListener('input', markAsChanged);
    startAutosave();
    showToast('System gotowy', 'Karta OIT v3.6 załadowana z nowymi lekami i szablonami', 'success', 3000);
});
