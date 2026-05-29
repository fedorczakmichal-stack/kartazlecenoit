// --- ENHANCED MEDICAL CARD SYSTEM v3.7 ---

const APP_VERSION = '3.7';

const continuousDrugTitrationDefaults = {
    'NORADRENALINA': 'Titracja do MAP wg celu.',
    'ADRENALINA': 'Titracja do MAP / perfuzji wg celu.',
    'WAZOPRESYNA': 'Zwykle stała dawka; ocena efektu hemodynamicznego.',
    'DOBUTAMINA': 'Titracja do perfuzji / echokardiografii.',
    'MILRINON': 'Titracja do rzutu / perfuzji; monitorować BP.',
    'PROPOFOL 1%': 'Sedacja do RASS wg celu.',
    'PROPOFOL 2%': 'Sedacja do RASS wg celu.',
    'MIDAZOLAM': 'Sedacja do RASS wg celu.',
    'DEKSMEDETOMIDYNA': 'Sedacja / delirium do RASS wg celu.',
    'FENTANYL': 'Analgezja do NRS/BPS wg celu.',
    'REMIFENTANYL': 'Analgezja do NRS/BPS wg celu.',
    'MORFINA': 'Analgezja do NRS/BPS wg celu.',
    'KETAMINA': 'Analgezja / sedacja wg celu.',
    'INSULINA': 'Titracja wg glikemii docelowej.',
    'HEPARYNA': 'Titracja wg APTT / anty-Xa.',
    'FUROSEMID': 'Titracja wg diurezy / bilansu.',
    'NITROGLICERYNA': 'Titracja wg bólu / BP.',
    'SALBUTAMOL': 'Titracja wg skurczu oskrzeli / HR.'
};

const antibioticDrugPatterns = [
    'AMOKSYCYLINA', 'AMIKACYNA', 'AZYTROMYCYNA', 'AZTREONAM', 'CEF', 'CIPROFLOKSACYNA',
    'ERTAPENEM', 'FLUKONAZOL', 'FOSFOMYCYNA', 'GANCYKLOWIR', 'GENTAMYCYNA', 'IMIPENEM',
    'KASPOFUNGINA', 'KLINDAMYCYNA', 'KOLISTYNA', 'LEWOFLOKSACYNA', 'LINEZOLID', 'MEROPENEM',
    'METRONIDAZOL', 'MIKAFUNGINA', 'OSELTAMIVIR', 'PIPERACYLINA', 'RIFAMPICYNA', 'RIFAKSYMINA',
    'TRIMETOPRIM', 'TYGECYKLINA', 'WANKOMYCYNA', 'WORYKONAZOL', 'ACYKLOWIR', 'ANIDULAFUNGINA',
    'DAPTOMYCYNA', 'VALACYCLOVIR', 'AMFOTERYCYNA'
];

// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = {
    'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-1.0 mcg/kg/min' },
    'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 mcg/kg/min' },
    'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 mcg/kg/min' },
    'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 mcg/kg/min' },
    'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min', note: 'W wstrząsie septycznym zwykle stała 0.03 j/min jako dodatek do noradrenaliny.' },
    'LEVOSIMENDAN': { concentration: '12.5mg/5ml (w 500ml 5% Glc)', dose: '0.05-0.2 mcg/kg/min' },
    'EPOPROSTENOL': { concentration: '1.5mg/50ml', dose: '2-10 ng/kg/min' },
    'MILRINON': { concentration: '10mg/50ml', dose: '0.375-0.75 mcg/kg/min', note: 'Redukcja dawki przy GFR<50. Unikać bolusa u niestabilnych hemodynamicznie.' },
    'PROPOFOL 1%': { concentration: '10mg/ml', dose: '0.3-4 mg/kg/h', note: 'Sedacja OIT: nie przekraczać 4 mg/kg/h.' },
    'PROPOFOL 2%': { concentration: '20mg/ml', dose: '0.3-4 mg/kg/h', note: 'Sedacja OIT: nie przekraczać 4 mg/kg/h.' },
    'MIDAZOLAM': { concentration: '50mg/50ml', dose: '1-15 mg/h' },
    'DEKSMEDETOMIDYNA': { concentration: '400mcg/100ml', dose: '0.2-1.4 mcg/kg/h', note: 'W OIT nie zaleca się dawki wysycającej.' },
    'FENTANYL': { concentration: '500mcg/50ml', dose: '25-100 mcg/h' },
    'REMIFENTANYL': { concentration: '2mg/40ml', dose: '0.006-0.74 mcg/kg/min', note: 'W OIT stosować u wentylowanych; w ChPL brak danych >3 dni.' },
    'MORFINA': { concentration: '20mg/20ml', dose: '1-5 mg/h' },
    'LIGNOCAINA 1%': { concentration: '500mg/50ml', dose: '1-2 mg/min' },
    'OKSYKODON': { concentration: '20mg/20ml', dose: '1-2 mg/h' },
    'KETAMINA': { concentration: '250mg/50ml', dose: '0.5-2 mg/kg/h' },
    'ROKURONIOM': { concentration: '50mg/5ml', dose: '0.3-0.6 mg/kg/h' },
    'CISATRAKURIUM': { concentration: '20mg/10ml', dose: '0.06-0.18 mg/kg/h' },
    'INSULINA': { concentration: '50j/50ml', dose: '0.5-10 j/h' },
    'HEPARYNA': { concentration: '25000j/50ml', dose: '500-2000 j/h', note: 'Pełna antykoagulacja: bolus 80 j/kg + wlew 18 j/kg/h, dawkowanie wg APTT 1.5-2.5x.' },
    'HEPARYNA (1ml/1j)': { concentration: '1ml/1j', dose: 'wlew dotętniczy 1ml/godz', fixedRate: '1' },
    'FUROSEMID': { concentration: '100mg/50ml', dose: '5-20 mg/h' },
    'AMIODARON': { concentration: '300mg/50ml 5% Glc', dose: '20-50 mg/h', note: 'Schemat ChPL: 150mg/10min bolus, potem 1 mg/min x 6h (60 mg/h), następnie 0.5 mg/min (30 mg/h). Max 1.2 g/24h. Tylko CVC.' },
    'NITROGLICERYNA': { concentration: '25mg/50ml', dose: '5-200 mcg/min' },
    'PANTOPRAZOL': { concentration: '80mg/100ml', dose: '8 mg/h (krwawienie z GOPP)', fixedRate: '10', note: 'Profilaktycznie zwykle 40 mg i.v. co 24h w lekach okresowych.' },
    'METOPROLOL': { concentration: '10mg/50ml', dose: '1-5 mg/h' },
    'SALBUTAMOL': { concentration: '5mg/50ml', dose: '3-20 mcg/min' },
    'DIAZEPAM': { concentration: '50mg/50ml', dose: '2-10 mg/h' },
    'NITROPRUSYDEK SODU': { concentration: '50mg/50ml', dose: '0.5-8 mcg/kg/min', note: 'Nie przekraczać 10 mcg/kg/min >10 min - ryzyko toksyczności tiocyjanianowej. Chronić przed światłem.' },
    'KLONIDYNA': { concentration: '150mcg/50ml', dose: '0.5-2 mcg/kg/h' },
    'LABETALOL': { concentration: '100mg/50ml', dose: '0.5-2 mg/min' },
    'ESMOLOL': { concentration: '2500mg/50ml', dose: '50-200 mcg/kg/min' },
    'DILTIAZEM': { concentration: '125mg/50ml', dose: '5-15 mg/h' },
    'MAGNEZ': { concentration: '2g/20ml', dose: '1-2 g/h' },
    'BIKARBONIAN SODU': { concentration: '100ml 8.4%', dose: '20-50 ml/h' },
    'OKTREOTYD': { concentration: '500mcg/50ml', dose: '25-50 mcg/h' },
    'ATROPINA (WLEW CIĄGŁY)': { concentration: '20mg/20ml', dose: '0.01-0.02 mg/kg/h' },
    'CHLOREK WAPNIA 10%': { concentration: '100mg/ml', dose: 'wg protokołu CRRT' },
    'Prismocitrate 18/0': { concentration: '18/0 mmol/l', dose: 'wg protokołu CRRT' },
    'Phoxillum': { concentration: 'Płyn dializacyjny', dose: 'wg protokołu CRRT' },
    'FENYLEFRYNA': { concentration: '10mg/50ml', dose: '0.5-6 mcg/kg/min', note: 'Czysty agonista alfa-1; przydatny przy tachyarytmii.' },
    'TIOPENTAL': { concentration: '2.5g/100ml', dose: '1-5 mg/kg/h', note: 'Stan padaczkowy oporny / śpiączka barbituranowa; monitorowanie EEG (burst-suppression).' },
    'KWAS TRANEKSAMOWY (WLEW)': { concentration: '1g/50ml', dose: '1 mg/kg/h', note: 'Po bolusie 1g/10min (CRASH-2/CRASH-3) - kontynuacja 1 mg/kg/h przez 8h.' },
    'VERAPAMIL': { concentration: '50mg/50ml', dose: '2-10 mg/h' },
    'ARGATROBAN': { concentration: '250mg/250ml', dose: '0.5-2 mcg/kg/min', note: 'Bezpośredni inhibitor trombiny - alternatywa dla heparyny w HIT. Titracja wg APTT 1.5-3x. W niewydolności wątroby zacząć od 0.5 mcg/kg/min.' },
    'BIWALIRUDYNA': { concentration: '250mg/50ml', dose: '0.15-0.25 mg/kg/h', note: 'Inhibitor trombiny - ECMO / HIT / PCI. Titracja wg APTT lub ACT.' },
    'KCl (WLEW)': { concentration: '40 mEq/100ml NaCl 0.9%', dose: '10-20 mEq/h', note: 'Tylko CVC; max 40 mEq/h w ciężkiej hipoK; monitorowanie EKG i K+ co 1-2h.' },
    'NIMODYPINA (WLEW)': { concentration: '10mg/50ml', dose: '1-2 mg/h', note: 'Skurcz naczyń po SAH; rozpocząć 1 mg/h x 2h, potem 2 mg/h. Ostrożnie - hipotensja; podaż wyłącznie CVC.' },
    'TIROFIBAN': { concentration: '12.5mg/250ml', dose: '0.1-0.15 mcg/kg/min', note: 'Antagonista GP IIb/IIIa; OZW / PCI. Redukcja dawki o 50% przy GFR<30.' },
    'ABCIKSYMAB': { concentration: '10mg/250ml NaCl 0.9%', dose: '0.125 mcg/kg/min (max 10 mcg/min)', note: 'Antagonista GP IIb/IIIa; po bolusie 0.25 mg/kg. Max wlew 12h.' }
 };

const periodicDrugsData = {
    'AMOKSYCYLINA/KWAS KLAWULANOWY': { dose: '1.2g', route: 'i.v.', frequency: 'co 8h' },
    'AMIKACYNA': { dose: '15-20mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h + TDM' },
    'AZYTROMYCYNA': { dose: '500mg', route: 'i.v. wlew 1h', frequency: 'co 24h' },
    'CEFEPIM': { dose: '2g', route: 'i.v. wlew 30min', frequency: 'co 8-12h' },
    'CEFTRIAKSON': { dose: '1-2g', route: 'i.v.', frequency: 'co 24h' },
    'CEFTAZYDYM': { dose: '2g', route: 'i.v.', frequency: 'co 8h' },
    'CEFUROKSYM': { dose: '1.5g', route: 'i.v.', frequency: 'co 8h' },
    'CIPROFLOKSACYNA': { dose: '400mg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'IMIPENEM/CYLASTATYNA': { dose: '0.5g', route: 'wlew i.v. 30min', frequency: 'co 6-8h' },
    'KOLISTYNA': { dose: 'nasyc. 9mln j, potem 4.5mln j', route: 'i.v.', frequency: 'co 12h' },
    'LEWOFLOKSACYNA': { dose: '500mg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'LINEZOLID': { dose: '600mg', route: 'wlew i.v. 2h', frequency: 'co 12h' },
    'MEROPENEM': { dose: '1g (OUN/ciężkie: 2g)', route: 'wlew i.v. 15-30min (ciężkie: 3h)', frequency: 'co 8h', note: 'W ciężkich zakażeniach rozważyć przedłużony wlew 3h 2g co 8h (PK/PD).' },
    'METRONIDAZOL': { dose: '500mg', route: 'i.v.', frequency: 'co 8h' },
    'PIPERACYLINA/TAZOBAKTAM': { dose: '4.5g', route: 'wlew i.v. 30min', frequency: 'co 6-8h' },
    'SULBAKTAM/CEFOPERAZON': { dose: '2g', route: 'i.v.', frequency: 'co 12h' },
    'TEIKOPLANINA': { dose: '6-12mg/kg nasyc. co 12h x3-5, potem 6-12mg/kg', route: 'i.v.', frequency: 'co 24h + TDM' },
    'TYGECYKLINA': { dose: 'nasyc. 100mg, potem 50mg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'WANKOMYCYNA': { dose: '15-20mg/kg (max 2g/dawkę)', route: 'wlew i.v. >=1h', frequency: 'co 8-12h + TDM', note: 'Dawkę i odstęp ustalać wg TDM i czynności nerek.' },
    'FLUKONAZOL': { dose: 'nasyc. 800mg, potem 400mg', route: 'i.v./p.o.', frequency: 'co 24h' },
    'WORYKONAZOL': { dose: 'nasyc. 6mg/kg x2, potem 4mg/kg', route: 'wlew i.v. 2h', frequency: 'co 12h' },
    'GENTAMYCYNA': { dose: '3-5mg/kg', route: 'wlew i.v. 1h', frequency: 'co 24h + TDM' },
    'FUROSEMID': { dose: '20-40mg', route: 'i.v.', frequency: 'wg zlecenia' },
    'MANNITOL 15%': { dose: '0.25-1g/kg', route: 'wlew i.v. 20-30min', frequency: 'wg osm./Na+' },
    'SPIRONOLAKTON': { dose: '25-100mg', route: 'p.o. (sonda)', frequency: 'co 24h', note: 'Podanie doustne; monitorować K+ i kreatyninę.' },
    'ENOKSAPARYNA': { dose: '40mg (profil.) lub 1mg/kg (tx)', route: 's.c.', frequency: 'co 24h profil. / co 12h tx', note: 'Dawka terapeutyczna 1 mg/kg co 12h. W otyłości >100kg rozważyć 40 mg co 12h profilaktycznie.' },
    'NADROPARYNA': { dose: '0.4-0.6ml (profil.) lub 85 j/kg (tx)', route: 's.c.', frequency: 'co 24h profil. / co 12h tx' },
    'DALTEPARYNA': { dose: '5000 j (profil.) lub 200 j/kg (tx)', route: 's.c.', frequency: 'co 24h' },
    'KWAS TRANEXAMOWY': { dose: '1g', route: 'i.v.', frequency: 'co 8h' },
    'ETAMSYLAT': { dose: '250-500mg', route: 'i.v.', frequency: 'co 6h' },
    'DEKSAMETAZON': { dose: '4-8mg (ARDS/COVID: 6mg)', route: 'i.v./p.o.', frequency: 'co 24h (obrzęk mózgu: co 6h)', note: 'RECOVERY: 6 mg co 24h x 10 dni w COVID-19 z hipoksemią. DEXA-ARDS: 20 mg co 24h x 5d, potem 10 mg co 24h x 5d.' },
    'HYDROKORTYZON': { dose: '50mg (wstrząs sept.) lub 100mg', route: 'i.v.', frequency: 'co 6h (łącznie 200 mg/d we wstrząsie)', note: 'SSC 2021: 200 mg/d we wstrząsie septycznym opornym na wazopresory - ciągły wlew lub 50 mg co 6h.' },
    'METYLOPREDNIZOLON': { dose: '125mg', route: 'i.v.', frequency: 'wg zlecenia' },
    'METAMIZOL': { dose: '1g (max 5g/d)', route: 'i.v.', frequency: 'co 6-8h' },
    'PARACETAMOL': { dose: '1g (max 4g/d)', route: 'i.v./p.o.', frequency: 'co 6h' },
    'METOKLOPRAMID': { dose: '10mg (max 30mg/d)', route: 'i.v. powoli >=3min', frequency: 'co 8h' },
    'PANTOPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' },
    'OMEPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'co 24h' },
    'HALOPERIDOL': { dose: '2.5-5mg', route: 'i.v./i.m.', frequency: 'wg zlecenia' },
    'CHLORPROMAZYNA': { dose: '25-50mg', route: 'i.m.', frequency: 'doraźnie' },
    'DESMOPRESYNA': { dose: '1-4mcg', route: 'i.v./s.c.', frequency: 'co 12-24h' },
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
    'IBUPROFEN': { dose: '400mg', route: 'i.v./p.o.', frequency: 'co 6-8h doraźnie' },
    'PYRALGINA': { dose: '1g (max 5g/d)', route: 'i.v.', frequency: 'co 6-8h doraźnie' },
    'KLOKSACYLINA': { dose: '2g', route: 'i.v.', frequency: 'co 6h' },
    'ERTAPENEM': { dose: '1g', route: 'wlew i.v. 30min', frequency: 'co 24h' },
    'KASPOFUNGINA': { dose: 'Nasycająca 70mg, potem 50mg (>80kg: 70mg)', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'MIKAFUNGINA': { dose: '100mg', route: 'wlew i.v. 1h', frequency: 'co 24h' },
    'ANIDULAFUNGINA': { dose: 'nasyc. 200mg, potem 100mg', route: 'wlew i.v.', frequency: 'co 24h' },
    'AMFOTERYCYNA B': { dose: '0.6-1mg/kg', route: 'wlew i.v. 4-6h', frequency: 'co 24h' },
    'AMFOTERYCYNA B LIPOSOMALNA': { dose: '3mg/kg', route: 'wlew i.v. 2h', frequency: 'co 24h' },
    'OSELTAMIVIR': { dose: '75mg', route: 'p.o. (sonda)', frequency: 'co 12h' },
    'VALACYCLOVIR': { dose: '1g', route: 'p.o. (sonda)', frequency: 'co 8-12h' },
    'ACYKLOWIR': { dose: '10mg/kg', route: 'wlew i.v. 1h', frequency: 'co 8h' },
    'GANCYKLOWIR': { dose: '5mg/kg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'RIFAMPICYNA': { dose: '600mg', route: 'i.v./p.o.', frequency: 'co 24h' },
    'CEFTAZYDYM/AWIBAKTAM': { dose: '2g/0.5g', route: 'wlew i.v. 2h', frequency: 'co 8h' },
    'CEFTOLOZAN/TAZOBAKTAM': { dose: '2g/1g', route: 'wlew i.v. 1h', frequency: 'co 8h' },
    'CEFTAROLINA': { dose: '600mg', route: 'wlew i.v. 1h', frequency: 'co 12h' },
    'DAPTOMYCYNA': { dose: '6-10mg/kg', route: 'wlew i.v. 30min', frequency: 'co 24h', note: 'Nie stosować w zapaleniu płuc.' },
    'FOSFOMYCYNA': { dose: '4-8g', route: 'wlew i.v.', frequency: 'co 8h' },
    'MEROPENEM/WABORBAKTAM': { dose: '2g/2g', route: 'wlew i.v. 3h', frequency: 'co 8h' },
    'CEFIDEROKOL': { dose: '2g', route: 'wlew i.v. 3h', frequency: 'co 8h' },
    'LEWETYRACETAM': { dose: '500-1000mg', route: 'i.v./p.o.', frequency: 'co 12h' },
    'NIMODYPINA': { dose: '60mg', route: 'p.o. (sonda)', frequency: 'co 4h' },
    'RIFAKSYMINA': { dose: '550mg', route: 'p.o. (sonda)', frequency: 'co 12h' },
    'REMIMAZOLAM': { dose: '5-10mg', route: 'i.v.', frequency: 'na zlecenie' },
    'SUGAMMADEKS': { dose: '2 mg/kg (TOF>=2) / 4 mg/kg (głęboki) / 16 mg/kg (natychmiast)', route: 'i.v. bolus', frequency: 'jednorazowo', note: 'Odwraca tylko rokuronium/wekuronium. Przy GFR<30 ostrożnie.' },
    'NEOSTYGMINA': { dose: '0.04-0.07 mg/kg (2.5-5 mg)', route: 'i.v.', frequency: 'jednorazowo', note: 'Zawsze z atropiną 0.01-0.02 mg/kg lub glikopironium. Tylko przy TOF>=2.' },
    'ATROPINA': { dose: '0.5-1mg', route: 'i.v.', frequency: 'doraźnie' },
    'FENTANYL': { dose: '50-100mcg', route: 'i.v.', frequency: 'na zlecenie' },
    'KETAMINA': { dose: '0.5mg/kg', route: 'i.v.', frequency: 'na zlecenie' },
    'TRANEKSAM': { dose: '1g', route: 'i.v.', frequency: 'co 8h' },
    'PROTAMINA': { dose: '1mg/100j heparyny', route: 'i.v. wolno', frequency: 'jednorazowo' },
    'WITAMINA K': { dose: '10mg', route: 'i.v. wolno', frequency: 'co 24h' },
    'TIAMINA': { dose: '100mg', route: 'i.v.', frequency: 'co 24h' },
    'PIRYDOKSYNA': { dose: '50mg', route: 'i.v.', frequency: 'co 24h' },
    'KWAS FOLIOWY': { dose: '5mg', route: 'p.o.', frequency: 'co 24h' },
    'BIOTYNA': { dose: '300mcg', route: 'p.o.', frequency: 'co 24h' },
    'KLINDAMYCYNA': { dose: '600-900mg', route: 'wlew i.v. 30min', frequency: 'co 8h', note: 'Zakażenia beztlenowcowe, TSS, SSTI. Hamuje produkcję toksyn (PVL).' },
    'AZTREONAM': { dose: '1-2g', route: 'wlew i.v. 30min', frequency: 'co 6-8h', note: 'Alternatywa dla pacjentów z alergią beta-laktamową (tylko G-).' },
    'TRIMETOPRIM/SULFAMETOKSAZOL': { dose: '15-20 mg/kg TMP/d w 3-4 dawkach (PCP)', route: 'wlew i.v. 60-90min', frequency: 'co 6-8h', note: 'Pneumocystozowe zapalenie płuc; standardowo 960 mg co 12h.' },
    'REMDESIVIR': { dose: '200mg nasyc., potem 100mg', route: 'wlew i.v. 30-120min', frequency: 'co 24h (5-10 dni)', note: 'COVID-19 z zapaleniem płuc; unikać przy GFR<30 (nośnik cyklodextryny).' },
    'FLUMAZENIL': { dose: '0.2mg bolus, potem 0.1 mg/min (max 1 mg)', route: 'i.v.', frequency: 'doraźnie', note: 'Antidotum BDZ. Uwaga na drgawki u długotrwale leczonych BDZ lub intoksykacji mieszanych.' },
    'NALOKSON': { dose: '0.04-0.4mg, powtarzać co 2-3min', route: 'i.v./i.m./s.c.', frequency: 'doraźnie', note: 'Antidotum opioidów. Titracja do oddechu, nie do świadomości.' },
    'NIMBEX (CISATRAKURIUM BOLUS)': { dose: '0.15 mg/kg bolus, potem wlew', route: 'i.v.', frequency: 'jednorazowo', note: 'Bolus przed rozpoczęciem wlewu w ciężkim ARDS (ACURASYS).' },
    'HIPERTONICZNY NaCl 10%': { dose: '2-3 ml/kg bolus (100-250 ml)', route: 'i.v. CVC', frequency: 'wg osm./Na+', note: 'Wzmożone ICP / obrzęk mózgu. Cel Na 145-155 mmol/l.' },
    'ISAVUKONAZOL': { dose: 'nasyc. 200mg co 8h x 6 dawek, potem 200mg', route: 'i.v./p.o.', frequency: 'co 24h', note: 'Aspergiloza, mukormykoza. Brak nośnika cyklodextryny - bezpieczny przy GFR<30. Wydłuża QT - kontrola EKG.' },
    'POSAKONAZOL': { dose: 'nasyc. 300mg co 12h dnia 1, potem 300mg', route: 'i.v./p.o.', frequency: 'co 24h', note: 'Profilaktyka i leczenie infekcji grzybiczych (Aspergillus, Candida). TDM (cel >1 mg/l).' },
    'IDARUCYZUMAB (PRAXBIND)': { dose: '5g (2 x 2.5g/50ml)', route: 'i.v. bolus / wlew 5-10min', frequency: 'jednorazowo', note: 'Antidotum dabigatranu; obie fiolki w odstępie <15 min. Po podaniu kontrola APTT/dTT.' },
    'ANDEKSANET ALFA': { dose: 'bolus 400-800mg (10-30 mg/min) + wlew 4-8 mg/min x 120min', route: 'i.v.', frequency: 'wg schematu', note: 'Antidotum apiksabanu / rywaroksabanu. Dawka wg leku, dawki i czasu od ostatniej dawki.' },
    'DABIGATRAN': { dose: '110-150mg', route: 'p.o. (sonda)', frequency: 'co 12h', note: 'Bezpośredni inhibitor trombiny. Redukcja przy GFR 30-50; przeciwwskazany przy GFR<30.' },
    'FONDAPARYNUKS': { dose: '2.5mg (profil.) lub 5-10mg wg masy (tx)', route: 's.c.', frequency: 'co 24h', note: 'Alternatywa LMWH w HIT. Przeciwwskazany przy GFR<30 (profil. <20).' },
    'MIDAZOLAM (BOLUS)': { dose: '1-5mg', route: 'i.v./i.m.', frequency: 'doraźnie / co 1-2h', note: 'Sedacja krótkotrwała / przerwanie drgawek. Ostrożnie u niewydolności wątroby i u starszych.' },
    'LORAZEPAM': { dose: '2-4mg (max 0.1 mg/kg)', route: 'i.v.', frequency: 'doraźnie - powtarzać co 5-10min', note: 'Stan padaczkowy - lek I rzutu (ALDP / NICE).' },
    'FENYTOINA': { dose: 'nasyc. 15-20 mg/kg, potem 4-6 mg/kg/d', route: 'wlew i.v. ≤50 mg/min', frequency: 'co 8h', note: 'Stan padaczkowy. Tylko w 0.9% NaCl, podać przez osobne wkłucie. Ryzyko hipotensji, arytmii - monitor EKG/RR. TDM.' },
    'KWAS WALPROINOWY': { dose: 'nasyc. 20-40 mg/kg, potem 1-2 mg/kg/h lub 10-15 mg/kg co 6h', route: 'i.v.', frequency: 'co 6h / wlew ciągły', note: 'Stan padaczkowy II rzutu. Ostrożnie w niewydolności wątroby; ryzyko hiperamonemii.' },
    'FENOBARBITAL': { dose: 'nasyc. 15-20 mg/kg, potem 1-3 mg/kg/d', route: 'wlew i.v. ≤100 mg/min', frequency: 'co 12h', note: 'Stan padaczkowy oporny. Ryzyko hipotensji, depresji oddechowej - zwykle wymaga intubacji.' }
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
    "Nutrison Energy 500ml (1.5 kcal/ml)": 40, "Nutrison Energy 1000ml (1.5 kcal/ml)": 60,
    "Nutrison Energy Multi Fibre 500ml (1.5 kcal/ml)": 40, "Nutrison Energy Multi Fibre 1000ml (1.5 kcal/ml)": 60,
    "Nutrison Protein Plus 500ml (1.25 kcal/ml)": 50, "Nutrison Protein Plus 1000ml (1.25 kcal/ml)": 80,
    "Nutrison Protein Plus Multi Fibre 500ml (1.28 kcal/ml)": 50, "Nutrison Protein Plus Multi Fibre 1000ml (1.28 kcal/ml)": 80,
    "Nutrison Advanced Diason 500ml (1.03 kcal/ml)": 50, "Nutrison Advanced Diason 1000ml (1.03 kcal/ml)": 80,
    "Nutrison Concentrated 500ml (2.0 kcal/ml)": 30,
    "Cubison 500ml (1.0 kcal/ml)": 50, "Cubison 1000ml (1.0 kcal/ml)": 80,
    "OMEGAFLEX PLUS 1250ml (1.3 kcal/ml)": 50, "OMEGAFLEX PLUS 1875ml (1.3 kcal/ml)": 75,
    "OMEGAFLEX SPECIAL 625ml (1.3 kcal/ml)": 25, "OMEGAFLEX SPECIAL 1250ml (1.3 kcal/ml)": 50, 
    "OMEGAFLEX SPECIAL 1875ml (1.3 kcal/ml)": 75, "Nutriflex Peri 1000ml (1.2 kcal/ml)": 80,
    "Nutriflex Plus 1000ml (1.2 kcal/ml)": 80, "SmofKabiven 986ml (1.1 kcal/ml)": 40, 
    "SmofKabiven 1477ml (1.1 kcal/ml)": 60, "SmofKabiven Extra NITROGEN 1012ml (1.2 kcal/ml)": 42,
    "SmofKabiven Extra NITROGEN 1518ml (1.2 kcal/ml)": 63, "SmofKabiven EF 986ml (1.1 kcal/ml)": 40,
    "SmofKabiven EF 1477ml (1.1 kcal/ml)": 60, "SmofKabiven 493ml (1.1 kcal/ml)": 20,
    "SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)": 35,
    "SmofKabiven LOW OSMO 1400ml (1.0 kcal/ml)": 58, "SmofKabiven LOW OSMO 1950ml (1.0 kcal/ml)": 81,
    "Aminomix 1 Novum 1000ml (0.8 kcal/ml)": 80, "Aminomix 1 Novum 1500ml (0.8 kcal/ml)": 100,
    "Kabiven 1026ml (0.9 kcal/ml)": 43, "Kabiven 1540ml (0.9 kcal/ml)": 64,
    "Kabiven 2053ml (0.9 kcal/ml)": 85,
    "Kabiven Peripheral 1440ml (0.7 kcal/ml)": 60, "Kabiven Peripheral 1920ml (0.7 kcal/ml)": 80,
    "Kabiven Peripheral 2400ml (0.7 kcal/ml)": 100
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
    "Nutrison Energy 500ml (1.5 kcal/ml)": { kcal: 750, volume: 500 },
    "Nutrison Energy 1000ml (1.5 kcal/ml)": { kcal: 1500, volume: 1000 },
    "Nutrison Energy Multi Fibre 500ml (1.5 kcal/ml)": { kcal: 750, volume: 500 },
    "Nutrison Energy Multi Fibre 1000ml (1.5 kcal/ml)": { kcal: 1500, volume: 1000 },
    "Nutrison Protein Plus 500ml (1.25 kcal/ml)": { kcal: 625, volume: 500 },
    "Nutrison Protein Plus 1000ml (1.25 kcal/ml)": { kcal: 1250, volume: 1000 },
    "Nutrison Protein Plus Multi Fibre 500ml (1.28 kcal/ml)": { kcal: 640, volume: 500 },
    "Nutrison Protein Plus Multi Fibre 1000ml (1.28 kcal/ml)": { kcal: 1280, volume: 1000 },
    "Nutrison Advanced Diason 500ml (1.03 kcal/ml)": { kcal: 515, volume: 500 },
    "Nutrison Advanced Diason 1000ml (1.03 kcal/ml)": { kcal: 1030, volume: 1000 },
    "Nutrison Concentrated 500ml (2.0 kcal/ml)": { kcal: 1000, volume: 500 },
    "Cubison 500ml (1.0 kcal/ml)": { kcal: 500, volume: 500 },
    "Cubison 1000ml (1.0 kcal/ml)": { kcal: 1000, volume: 1000 },
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
    "SmofKabiven 493ml (1.1 kcal/ml)": { kcal: 550, volume: 493 },
    "SmofKabiven LOW OSMO 850ml (1.0 kcal/ml)": { kcal: 850, volume: 850 },
    "SmofKabiven LOW OSMO 1400ml (1.0 kcal/ml)": { kcal: 1400, volume: 1400 }, 
    "SmofKabiven LOW OSMO 1950ml (1.0 kcal/ml)": { kcal: 1950, volume: 1950 },
    "Aminomix 1 Novum 1000ml (0.8 kcal/ml)": { kcal: 800, volume: 1000 },
    "Aminomix 1 Novum 1500ml (0.8 kcal/ml)": { kcal: 1200, volume: 1500 },
    "Kabiven 1026ml (0.9 kcal/ml)": { kcal: 900, volume: 1026 },
    "Kabiven 1540ml (0.9 kcal/ml)": { kcal: 1400, volume: 1540 },
    "Kabiven 2053ml (0.9 kcal/ml)": { kcal: 1900, volume: 2053 },
    "Kabiven Peripheral 1440ml (0.7 kcal/ml)": { kcal: 1000, volume: 1440 },
    "Kabiven Peripheral 1920ml (0.7 kcal/ml)": { kcal: 1400, volume: 1920 },
    "Kabiven Peripheral 2400ml (0.7 kcal/ml)": { kcal: 1700, volume: 2400 }
};

const gfrDoseAdjustments = {
    'MEROPENEM': [
        { gfrMax: 10, dose: '0.5g', frequency: 'co 24h' },
        { gfrMax: 25, dose: '0.5g', frequency: 'co 12h' },
        { gfrMax: 50, dose: '1g', frequency: 'co 12h' }
    ],
    'PIPERACYLINA/TAZOBAKTAM': [
        { gfrMax: 20, dose: '4.5g', frequency: 'co 12h' },
        { gfrMax: 40, dose: '4.5g', frequency: 'co 8h' }
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
        { gfrMax: 50, dose: 'dawka nasyc. bez zmian, potem 50%', frequency: 'co 24h' }
    ],
    'ENOKSAPARYNA': [
        { gfrMax: 15, dose: 'rozważ HNF zamiast LMWH', frequency: ''},
        { gfrMax: 30, dose: '20mg (profil.)', frequency: 'co 24h' }
    ],
    'CEFEPIM': [
        { gfrMax: 10, dose: '1g', frequency: 'co 24h' },
        { gfrMax: 30, dose: '1-2g', frequency: 'co 24h' },
        { gfrMax: 50, dose: '2g', frequency: 'co 12h' }
    ],
    'OSELTAMIVIR': [
        { gfrMax: 10, dose: '30mg', frequency: 'po każdej HD / wg ChPL' },
        { gfrMax: 30, dose: '30mg', frequency: 'co 24h' },
        { gfrMax: 60, dose: '30mg', frequency: 'co 12h' }
    ],
    'AMFOTERYCYNA B': [
        { gfrMax: 30, dose: 'Zmniejszyć dawkę o 50% lub rozważyć formę liposomalną', frequency: 'Monitorować GFR' }
    ],
    'VALACYCLOVIR': [
        { gfrMax: 10, dose: '500mg', frequency: 'co 24h' },
        { gfrMax: 30, dose: '1g', frequency: 'co 24h' },
        { gfrMax: 50, dose: '1g', frequency: 'co 12h' }
    ],
    'CEFUROKSYM': [
        { gfrMax: 10, dose: '750mg', frequency: 'co 24h' },
        { gfrMax: 20, dose: '750mg', frequency: 'co 12h' }
    ],
    'METOKLOPRAMID': [
        { gfrMax: 15, dose: '2.5mg', frequency: 'co 8h' },
        { gfrMax: 60, dose: '5mg', frequency: 'co 8h' }
    ],
    'PARACETAMOL': [
        { gfrMax: 10, dose: '1g (max 4g/d)', frequency: 'co 8h' },
        { gfrMax: 50, dose: '1g (max 4g/d)', frequency: 'co >=6h' }
    ],
    'SPIRONOLAKTON': [
        { gfrMax: 30, dose: 'przeciwwskazany', frequency: '' }
    ],
    'ACYKLOWIR': [
        { gfrMax: 10, dose: '5mg/kg', frequency: 'co 24h' },
        { gfrMax: 25, dose: '10mg/kg', frequency: 'co 24h' },
        { gfrMax: 50, dose: '10mg/kg', frequency: 'co 12h' }
    ],
    'CEFTAZYDYM/AWIBAKTAM': [
        { gfrMax: 15, dose: '0.75g/0.1875g', frequency: 'co 24h' },
        { gfrMax: 30, dose: '0.75g/0.1875g', frequency: 'co 12h' },
        { gfrMax: 50, dose: '1g/0.25g', frequency: 'co 8h' }
    ],
    'CEFTOLOZAN/TAZOBAKTAM': [
        { gfrMax: 29, dose: '0.75g', frequency: 'co 8h' },
        { gfrMax: 50, dose: '1.5g', frequency: 'co 8h' }
    ],
    'DAPTOMYCYNA': [
        { gfrMax: 30, dose: '6-10mg/kg', frequency: 'co 48h' }
    ],
    'LEWETYRACETAM': [
        { gfrMax: 30, dose: '250-500mg', frequency: 'co 12h' },
        { gfrMax: 50, dose: '500mg', frequency: 'co 12h' },
        { gfrMax: 80, dose: '500-1000mg', frequency: 'co 12h' }
    ],
    'KOLISTYNA': [
        { gfrMax: 10, dose: 'nasyc. 9mln j, potem 1.25-1.5mln j', frequency: 'co 12h' },
        { gfrMax: 50, dose: 'nasyc. 9mln j, potem 2.25-2.5mln j', frequency: 'co 12h' }
    ],
    'CIPROFLOKSACYNA': [
        { gfrMax: 30, dose: '400mg', frequency: 'co 24h' },
        { gfrMax: 60, dose: '400mg', frequency: 'co 12h' }
    ],
    'IMIPENEM/CYLASTATYNA': [
        { gfrMax: 15, dose: '0.25g', frequency: 'co 12h' },
        { gfrMax: 30, dose: '0.5g', frequency: 'co 12h' },
        { gfrMax: 60, dose: '0.5g', frequency: 'co 8h' }
    ],
    'ERTAPENEM': [
        { gfrMax: 30, dose: '0.5g', frequency: 'co 24h' }
    ],
    'REMDESIVIR': [
        { gfrMax: 30, dose: 'przeciwwskazany (nośnik cyklodextryny)', frequency: '' }
    ],
    'DABIGATRAN': [
        { gfrMax: 30, dose: 'przeciwwskazany', frequency: '' },
        { gfrMax: 50, dose: '110mg', frequency: 'co 12h' }
    ],
    'FONDAPARYNUKS': [
        { gfrMax: 20, dose: 'przeciwwskazany', frequency: '' },
        { gfrMax: 50, dose: '1.5mg (profil.)', frequency: 'co 24h' }
    ],
    'TIROFIBAN': [
        { gfrMax: 30, dose: 'redukcja dawki o 50%', frequency: 'wg protokołu' }
    ]
};

// --- SZABLONY KART ---
const cardTemplates = {
    universal: {
        name: "Uniwersalny OIT",
        diagnosis: "Intensywna terapia",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-75 mcg/h" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 mcg/kg/min" },
            { name: "INSULINA", conc: "50j/50ml", dose: "2-4 j/h" },
            { name: "HEPARYNA (1ml/1j)", conc: "1ml/1j", dose: "wlew dotętniczy 1ml/godz" }
        ],
        periodicDrugs: [
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v./p.o.", freq: "co 6h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" }
        ],
        fluids: [
            { name: "Optilyte", volume: "500", rate: "50", additives: ["+ KCl 15% 10ml"] }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutricomp Standard 500ml (1 kcal/ml)", rate: "50" }
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
        name: "Kardiochirurgia",
        diagnosis: "Stan po operacji kardiochirurgicznej",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 mcg/kg/min" },
            { name: "DOBUTAMINA", conc: "250mg/50ml", dose: "2-8 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-50 mcg/h" },
            { name: "NITROGLICERYNA", conc: "25mg/50ml", dose: "10-50 mcg/min" }
        ],
        periodicDrugs: [
            { name: "CEFUROKSYM", dose: "1.5g", route: "i.v.", freq: "co 8h" },
            { name: "FUROSEMID", dose: "20-40mg", route: "i.v.", freq: "co 8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "KWAS TRANEXAMOWY", dose: "1g", route: "i.v.", freq: "co 8h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" }
        ],
        fluids: [
            { name: "NaCl 0.9%", volume: "500", rate: "50" },
            { name: "Plasmalyte", volume: "500", rate: "40" }
        ],
        procedures: [
            { time: "co 1h", name: "Kontrola drenów" },
            { time: "co 4h", name: "Gazometria" },
            { time: "codziennie", name: "RTG klatki piersiowej" },
            { time: "co 6h", name: "Glikemia" },
            { time: "codziennie", name: "EKG" }
        ]
    },
    trauma: {
        name: "Uraz wielonarządowy",
        diagnosis: "Uraz wielonarządowy, wstrząs pourazowy",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.2-1.0 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-4 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "50-100 mcg/h" },
            { name: "KETAMINA", conc: "250mg/50ml", dose: "0.5-1 mg/kg/h" }
        ],
        periodicDrugs: [
            { name: "AMOKSYCYLINA/KWAS KLAWULANOWY", dose: "1.2g", route: "i.v.", freq: "co 8h" },
            { name: "KWAS TRANEXAMOWY", dose: "1g", route: 'i.v.', freq: "co 8h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" }
        ],
        fluids: [
            { name: "NaCl 0.9%", volume: "500", rate: "100" },
            { name: "Gelofusine", volume: "500", rate: "100" },
            { name: "Albuminy 5%", volume: "250", rate: "50" }
        ],
        procedures: [
            { time: "co 2h", name: "Zmiany ułożenia" },
            { time: "co 6h", name: "Profilaktyka odleżyn" },
            { time: "codziennie", name: "RTG klatki piersiowej" },
            { time: "co 12h", name: "IAP" }
        ]
    },
    sepsis: {
        name: "Sepsa / Wstrząs septyczny",
        diagnosis: "Wstrząs septyczny, MOF",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.3-1.5 mcg/kg/min" },
            { name: "WAZOPRESYNA", conc: "20j/20ml", dose: "0.02-0.04 j/min" },
            { name: "DEKSMEDETOMIDYNA", conc: "400mcg/100ml", dose: "0.4-0.7 mcg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "50-100 mcg/h" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "1g (OUN: 2g)", route: "wlew i.v. 15-30min", freq: "co 8h" },
            { name: "WANKOMYCYNA", dose: "15-20mg/kg (max 2g/dawkę)", route: "wlew i.v. >=1h", freq: "co 8-12h + TDM" },
            { name: "MIKAFUNGINA", dose: "100mg", route: "wlew i.v. 1h", freq: "co 24h (ryz. Candida)" },
            { name: "HYDROKORTYZON", dose: "50mg", route: "i.v.", freq: "co 6h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "80", additives: ["+ KCl 15% 10ml"] },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ],
        procedures: [
            { time: "co 6h", name: "Gazometria tętnicza" },
            { time: "codziennie", name: "Posiew krwi" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "co 12h", name: "IAP" }
        ]
    },
    respiratory: {
        name: "ARDS / Niewydolność oddechowa",
        diagnosis: "ARDS, niewydolność oddechowa",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-4 mg/kg/h" },
            { name: "DEKSMEDETOMIDYNA", conc: "400mcg/100ml", dose: "0.4-1.0 mcg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "75-150 mcg/h" },
            { name: "CISATRAKURIUM", conc: "20mg/10ml", dose: "0.1-0.18 mg/kg/h" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. 30min", freq: "co 6-8h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 6h" },
            { name: "BERODUAL", dose: "1-2ml", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg", route: "nebulizacja", freq: "co 8h" },
            { name: "METYLOPREDNIZOLON", dose: "125mg", route: "i.v.", freq: "co 24h" }
        ],
        procedures: [
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "codziennie", name: "RTG klatki piersiowej" },
            { time: "co 8h", name: "Gazometria tętnicza" },
            { time: "co 2h", name: "Zmiany ułożenia" }
        ]
    },
    neurological: {
        name: "Neurologia / Udar",
        diagnosis: "Udar niedokrwienny mózgu / Krwotok podpajęczynówkowy",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-2 mg/kg/h" },
            { name: "REMIFENTANYL", conc: "2mg/40ml", dose: "0.05-0.15 mcg/kg/min" },
            { name: "NITROGLICERYNA", conc: "25mg/50ml", dose: "10-50 mcg/min" }
        ],
        periodicDrugs: [
            { name: "MANNITOL 15%", dose: "0.25-1g/kg", route: "wlew i.v. 20-30min", freq: "wg osm./Na+" },
            { name: "LEWETYRACETAM", dose: "500-1000mg", route: "i.v./p.o.", freq: "co 12h" },
            { name: "NIMODYPINA", dose: "60mg", route: "p.o. (sonda)", freq: "co 4h (SAH)" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" }
        ],
        procedures: [
            { time: "co 1h", name: "Ocena GCS i źrenic" },
            { time: "co 12h", name: "IAP" },
            { time: "codziennie", name: "CT głowy (wg wskazań)" }
        ]
    },
    pancreatitis: {
        name: "Ostre zapalenie trzustki",
        diagnosis: "Ostre zapalenie trzustki, MOF",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.8 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "50-100 mcg/h" },
            { name: "OKTREOTYD", conc: "500mcg/50ml", dose: "25-50 mcg/h" }
        ],
        periodicDrugs: [
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v./p.o.", freq: "co 6h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "100", additives: ["+ KCl 15% 20ml", "+ MgSO4 20% 10ml"] },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Advanced Peptisorb 500ml (1 kcal/ml)", rate: "30" }
        ],
        procedures: [
            { time: "co 12h", name: "IAP" },
            { time: "co 6h", name: "Gazometria + markery OZT" },
            { time: "codziennie", name: "USG jamy brzusznej" }
        ]
    },
    postop_abdominal: {
        name: "Stan po operacji brzusznej",
        diagnosis: "Stan po laparotomii, perforacja jelita",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.05-0.3 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "50-75 mcg/h" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. 30min", freq: "co 6-8h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "METOKLOPRAMID", dose: "10mg (max 30mg/d)", route: "i.v. powoli >=3min", freq: "co 8h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "80", additives: ["+ KCl 15% 15ml"] }
        ],
        procedures: [
            { time: "co 8h", name: "Zmiana opatrunku rany" },
            { time: "co 12h", name: "IAP" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "codziennie", name: "RTG brzucha" }
        ]
    },
    liver_failure: {
        name: "Niewydolność wątroby",
        diagnosis: "Niewydolność wątroby, encefalopatia wątrobowa",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-2 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-50 mcg/h" }
        ],
        periodicDrugs: [
            { name: "RIFAKSYMINA", dose: "550mg", route: "p.o. (sonda)", freq: "co 12h" },
            { name: "LACTULOSUM", dose: "30ml", route: "p.o. (sonda)", freq: "co 6h" },
            { name: "ORNITYNA", dose: "20g", route: "i.v. wlew 24h", freq: "co 24h" },
            { name: "WITAMINA K", dose: "10mg", route: "i.v. wolno", freq: "co 24h" },
            { name: "TIAMINA", dose: "100mg", route: "i.v.", freq: "co 24h" }
        ],
        fluids: [
            { name: "Glukoza 10%", volume: "500", rate: "40" },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ],
        nutrition: [
            { type: "Żywienie pozajelitowe", prep: "Aminomix 1 Novum 1000ml (0.8 kcal/ml)", rate: "40" }
        ],
        procedures: [
            { time: "co 4h", name: "Ocena encefalopatii" },
            { time: "co 6h", name: "Gazometria + amoniak" },
            { time: "codziennie", name: "Parametry wątrobowe" }
        ]
    },
    covid_ards: {
        name: "COVID-19 / ARDS",
        diagnosis: "COVID-19, ARDS ciężki",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "3-4 mg/kg/h" },
            { name: "DEKSMEDETOMIDYNA", conc: "400mcg/100ml", dose: "0.6-1.2 mcg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "100-150 mcg/h" },
            { name: "CISATRAKURIUM", conc: "20mg/10ml", dose: "0.15-0.2 mg/kg/h" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.2-0.8 mcg/kg/min" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. 30min", freq: "co 6-8h (nadkaż.)" },
            { name: "DEKSAMETAZON", dose: "6mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 4h" }
        ],
        procedures: [
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 2h", name: "Pozycja pronacyjna (wg protokołu)" },
            { time: "co 6h", name: "Gazometria tętnicza" },
            { time: "codziennie", name: "RTG klatki piersiowej" },
            { time: "codziennie", name: "D-dimery, ferrytyna, CRP" }
        ]
    },
    renal: {
        name: "CRRT (cytryniany)",
        diagnosis: "Niewydolność nerek - CRRT CVVHD",
        continuousDrugs: [
            { name: "Prismocitrate 18/0", conc: "18/0 mmol/l", dose: "wg protokołu CRRT" },
            { name: "Phoxillum", conc: "Płyn dializacyjny", dose: "wg protokołu CRRT" },
            { name: "CHLOREK WAPNIA 10%", conc: "100mg/ml", dose: "wg protokołu CRRT" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.5 mcg/kg/min" },
            { name: "HEPARYNA (1ml/1j)", conc: "1ml/1j", dose: "wlew dotętniczy 1ml/godz" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "0.5g", route: "wlew i.v. 15-30min", freq: "co 12h" },
            { name: "FUROSEMID", dose: "40mg", route: "i.v.", freq: "co 12h" }
        ],
        procedures: [
            { time: "co 4h", name: "Kontrola Ca zjonizowanego (systemowe)" },
            { time: "co 8h", name: "Kontrola Ca zjonizowanego (zza filtra)" },
            { time: "co 6h", name: "Gazometria tętnicza i żylna" },
            { time: "co 12h", name: "Kontrola parametrów CRRT" },
            { time: "co 24h", name: "Bilans płynów CRRT" }
        ]
    },
    vap_pneumonia: {
        name: "Zapalenie płuc / VAP",
        diagnosis: "Zapalenie płuc / VAP, niewydolność oddechowa",
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-75 mcg/h" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.05-0.5 mcg/kg/min" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. 30min", freq: "co 6h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg (3ml)", route: "nebulizacja", freq: "co 8h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "40" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Multi Fibre 1000ml (1 kcal/ml)", rate: "40" }
        ],
        procedures: [
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 6h", name: "Gazometria tętnicza" },
            { time: "codziennie", name: "RTG klatki piersiowej / USG płuc" },
            { time: "codziennie", name: "Ocena gotowości do oddechu spontanicznego" },
            { time: "co 2h", name: "Zmiany ułożenia" }
        ],
        notes: "Antybiotykoterapię zweryfikować po posiewach i antybiogramie; dostosować dawki do GFR. Jeśli ryzyko MRSA, przed wydrukiem dodać lek przeciw MRSA."
    },
    post_cardiac_arrest: {
        name: "Po NZK / ROSC",
        diagnosis: "Stan po nagłym zatrzymaniu krążenia, po ROSC",
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.1-0.8 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1-4 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-100 mcg/h" },
            { name: "INSULINA", conc: "50j/50ml", dose: "1-5 j/h" }
        ],
        periodicDrugs: [
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v./p.o.", freq: "co 6h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "40" }
        ],
        procedures: [
            { time: "ciągłe", name: "Kontrola temperatury - unikać gorączki" },
            { time: "co 1h", name: "Glikemia" },
            { time: "co 2h", name: "Ocena źrenic i GCS/RASS" },
            { time: "co 6h", name: "Gazometria + mleczany + elektrolity" },
            { time: "codziennie", name: "EKG" },
            { time: "wg wskazań", name: "EEG / konsultacja neurologiczna" }
        ],
        notes: "Nie zlecać rutynowej profilaktyki przeciwdrgawkowej bez napadów/EEG. Utrzymywać normotermię i unikać hipertermii."
    },
    gi_bleeding: {
        name: "Krwawienie z GOPP",
        diagnosis: "Krwawienie z górnego odcinka przewodu pokarmowego",
        continuousDrugs: [
            { name: "PANTOPRAZOL", conc: "80mg/100ml", dose: "8 mg/h (krwawienie z GOPP)", rate: "10" },
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.05-0.5 mcg/kg/min" }
        ],
        periodicDrugs: [
            { name: "WITAMINA K", dose: "10mg", route: "i.v. wolno", freq: "co 24h, jeśli VKA/INR" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "100" },
            { name: "NaCl 0.9%", volume: "500", rate: "100" }
        ],
        procedures: [
            { time: "pilne", name: "Gastroskopia" },
            { time: "co 4h", name: "Morfologia + koagulogram" },
            { time: "co 6h", name: "Gazometria + mleczany" },
            { time: "ciągłe", name: "Monitorowanie krwawienia / stolca / sondy" },
            { time: "wg wskazań", name: "Próba zgodności / KKCz / FFP / PLT" }
        ],
        notes: "Przy podejrzeniu żylaków dodać lek wazoaktywny wg dostępności/protokołu i antybiotyk. Nie drukować LMWH, jeśli aktywne krwawienie. Nie stosować rutynowo TXA w krwawieniu z GOPP."
    },
    dka_hhs: {
        name: "DKA / HHS",
        diagnosis: "Cukrzycowa kwasica ketonowa / stan hiperglikemiczno-hiperosmolalny",
        continuousDrugs: [
            { name: "INSULINA", conc: "50j/50ml", dose: "0.05-0.1 j/kg/h" }
        ],
        periodicDrugs: [
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" }
        ],
        fluids: [
            { name: "NaCl 0.9%", volume: "1000", rate: "250", additives: ["+ KCl 15% 20ml"] },
            { name: "Glukoza 5%", volume: "500", rate: "100", additives: ["+ KCl 15% 20ml"] }
        ],
        procedures: [
            { time: "co 1h", name: "Glikemia" },
            { time: "co 2h", name: "Gazometria + Na/K + luka anionowa" },
            { time: "co 4h", name: "Ketonemia / ketonuria" },
            { time: "co 6h", name: "Bilans płynów" },
            { time: "ciągłe", name: "Monitorowanie EKG" }
        ],
        notes: "Nie rozpoczynać insuliny przy K+ <3,3 mmol/l przed substytucją potasu. Po spadku glikemii dodać glukozę i kontynuować insulinę do zamknięcia luki."
    },
    copd_exacerbation: {
        name: "Zaostrzenie POChP",
        diagnosis: "Zaostrzenie POChP, ostra niewydolność oddechowa",
        continuousDrugs: [
            { name: "DEKSMEDETOMIDYNA", conc: "400mcg/100ml", dose: "0.2-0.7 mcg/kg/h" }
        ],
        periodicDrugs: [
            { name: "METYLOPREDNIZOLON", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 4-6h" },
            { name: "IPRATROPIUM", dose: "0.5mg (2ml)", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg (3ml)", route: "nebulizacja", freq: "co 8h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "30" }
        ],
        procedures: [
            { time: "co 4h", name: "Gazometria tętnicza" },
            { time: "ciągłe", name: "NIV / respirator wg tolerancji" },
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "codziennie", name: "RTG klatki piersiowej / USG płuc" },
            { time: "codziennie", name: "Ocena gotowości do odłączenia NIV/respiratora" }
        ],
        notes: "Cel SpO2 zwykle 88-92%, jeśli retencja CO2. Antybiotyk tylko przy wskazaniach klinicznych."
    },
    weaning_extubation: {
        name: "Wybudzanie / ekstubacja",
        diagnosis: "Plan wybudzania i ekstubacji",
        continuousDrugs: [
            { name: "DEKSMEDETOMIDYNA", conc: "400mcg/100ml", dose: "0.2-0.7 mcg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "25-50 mcg/h" }
        ],
        periodicDrugs: [
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v./p.o.", freq: "co 6h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "500", rate: "30" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison 500ml (1 kcal/ml)", rate: "30" }
        ],
        procedures: [
            { time: "rano", name: "Odstawić/redukować sedację wg decyzji lekarskiej" },
            { time: "rano", name: "Próba oddechu spontanicznego" },
            { time: "przed ekst.", name: "Ocena odruchów / kaszlu / przecieku wokół rurki" },
            { time: "po ekst.", name: "Tlenoterapia / NIV / HFNO wg tolerancji" },
            { time: "co 2h", name: "Ocena bólu i majaczenia" },
            { time: "codziennie", name: "Kinezyterapia i pionizacja" }
        ],
        notes: "Po wydruku planu nie zwiększać ponownie sedacji bez nowego zlecenia lekarskiego; przy pogorszeniu oddechu wezwać lekarza."
    },
    test: {
        name: "Test - Typowy pacjent OIT",
        diagnosis: "Sepsa, niewydolność krążenia, oddechowa i nerek (bez CRRT)",
        headerData: {
            patientNameInput: "Jan Kowalski",
            peselInput: "65030154321",
            historyNumberInput: "H-23456/2025",
            admissionDateInput: "01.10.2025",
            patientWeight: "85",
            heightInput: "178",
            gfrInput: "35",
            roomInput: "Sala 3 / Łóżko 2",
            allergiesInput: "Penicylina, kontrasty jodowe"
        },
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.35 mcg/kg/min" },
            { name: "DOBUTAMINA", conc: "250mg/50ml", dose: "5 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2.5 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "75 mcg/h" },
            { name: "MIDAZOLAM", conc: "50mg/50ml", dose: "4 mg/h" },
            { name: "INSULINA", conc: "50j/50ml", dose: "3 j/h" },
            { name: "HEPARYNA (1ml/1j)", conc: "1ml/1j", dose: "wlew dotętniczy 1ml/godz" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "1g (OUN: 2g)", route: "wlew i.v. 15-30min", freq: "co 12h" },
            { name: "WANKOMYCYNA", dose: "15-20mg/kg (max 2g/dawkę)", route: "wlew i.v. >=1h", freq: "co 8-12h + TDM" },
            { name: "MIKAFUNGINA", dose: "100mg", route: "wlew i.v. 1h", freq: "co 24h (ryz. Candida)" },
            { name: "HYDROKORTYZON", dose: "50mg", route: "i.v.", freq: "co 6h" },
            { name: "FUROSEMID", dose: "40mg", route: "i.v.", freq: "co 8h" },
            { name: "SPIRONOLAKTON", dose: "50mg", route: "p.o. (sonda)", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6-8h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v./p.o.", freq: "co 6h" },
            { name: "METOKLOPRAMID", dose: "10mg (max 30mg/d)", route: "i.v. powoli >=3min", freq: "co 8h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 6h" },
            { name: "BERODUAL", dose: "1ml", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg", route: "nebulizacja", freq: "co 8h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "70", additives: ["+ KCl 15% 20ml", "+ MgSO4 20% 10ml"] },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Multi Fibre 1000ml (1 kcal/ml)", rate: "50" },
            { type: "Żywienie pozajelitowe", prep: "SmofKabiven 1477ml (1.1 kcal/ml)", rate: "60" }
        ],
        procedures: [
            { time: "co 1h", name: "Diureza" },
            { time: "co 2h", name: "Zmiany ułożenia" },
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "co 6h", name: "Glikemia" },
            { time: "co 6h", name: "Gazometria tętnicza" },
            { time: "co 6h", name: "Profilaktyka odleżyn" },
            { time: "co 12h", name: "IAP" },
            { time: "co 12h", name: "OCŻ" },
            { time: "codziennie", name: "RTG klatki piersiowej przyłóżkowe" },
            { time: "codziennie", name: "Kinezyterapia" },
            { time: "codziennie", name: "Zmiana opatrunku CVC" },
            { time: "codziennie", name: "Bilans płynów 24h" },
            { time: "codziennie", name: "Morfologia + elektrolity + kreatynina" },
            { time: "2x tyg", name: "Posiew krwi" }
        ]
    },
    test_small: {
        name: "Test - Mały load leków (stabilny)",
        diagnosis: "Stan po operacji - obserwacja, wybudzanie",
        headerData: {
            patientNameInput: "Anna Nowak",
            peselInput: "70050567890",
            historyNumberInput: "H-11111/2026",
            admissionDateInput: "27.04.2026",
            patientWeight: "70",
            heightInput: "168",
            gfrInput: "75",
            roomInput: "Sala 1 / Łóżko 3",
            allergiesInput: "Brak znanych"
        },
        continuousDrugs: [
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "1.5 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "30 mcg/h" }
        ],
        periodicDrugs: [
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v.", freq: "co 6h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 8h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "60" }
        ],
        nutrition: [],
        procedures: [
            { time: "co 1h", name: "Diureza" },
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 6h", name: "Glikemia" },
            { time: "codziennie", name: "Bilans płynów 24h" },
            { time: "codziennie", name: "Morfologia + elektrolity + kreatynina" },
            { time: "codziennie", name: "Próba oddechu spontanicznego" }
        ]
    },
    test_medium: {
        name: "Test - Średni load leków (sepsa stabilizująca się)",
        diagnosis: "Sepsa o punkcie wyjścia z układu moczowego - stabilizacja",
        headerData: {
            patientNameInput: "Marek Wiśniewski",
            peselInput: "60111267890",
            historyNumberInput: "H-22222/2026",
            admissionDateInput: "25.04.2026",
            patientWeight: "78",
            heightInput: "175",
            gfrInput: "55",
            roomInput: "Sala 2 / Łóżko 1",
            allergiesInput: "Brak znanych"
        },
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.15 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "2 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "50 mcg/h" },
            { name: "INSULINA", conc: "50j/50ml", dose: "2 j/h" }
        ],
        periodicDrugs: [
            { name: "PIPERACYLINA/TAZOBAKTAM", dose: "4.5g", route: "wlew i.v. >=4h", freq: "co 8h" },
            { name: "HYDROKORTYZON", dose: "50mg", route: "i.v.", freq: "co 6h" },
            { name: "FUROSEMID", dose: "20mg", route: "i.v.", freq: "co 8h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 24h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v.", freq: "co 6h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 8h" },
            { name: "METOKLOPRAMID", dose: "10mg", route: "i.v.", freq: "co 8h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "70", additives: ["+ KCl 15% 20ml"] },
            { name: "Albuminy 20%", volume: "100", rate: "25" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Multi Fibre 1000ml (1 kcal/ml)", rate: "40" }
        ],
        procedures: [
            { time: "co 1h", name: "Diureza" },
            { time: "co 2h", name: "Zmiany ułożenia" },
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "co 6h", name: "Glikemia" },
            { time: "co 8h", name: "Gazometria tętnicza" },
            { time: "co 12h", name: "OCŻ" },
            { time: "codziennie", name: "RTG klatki piersiowej przyłóżkowe" },
            { time: "codziennie", name: "Zmiana opatrunku CVC" },
            { time: "codziennie", name: "Bilans płynów 24h" }
        ]
    },
    test_large: {
        name: "Test - Duży load leków (MOF + CRRT)",
        diagnosis: "Wstrząs septyczny, niewydolność wielonarządowa, CRRT",
        headerData: {
            patientNameInput: "Krzysztof Zieliński",
            peselInput: "55070198765",
            historyNumberInput: "H-33333/2026",
            admissionDateInput: "20.04.2026",
            patientWeight: "92",
            heightInput: "180",
            gfrInput: "12",
            roomInput: "Sala 4 / Łóżko 1",
            allergiesInput: "Sulfonamidy, lateks"
        },
        continuousDrugs: [
            { name: "NORADRENALINA", conc: "8mg/50ml", dose: "0.6 mcg/kg/min" },
            { name: "ADRENALINA", conc: "5mg/50ml", dose: "0.1 mcg/kg/min" },
            { name: "WAZOPRESYNA", conc: "20j/50ml", dose: "0.03 j/min" },
            { name: "DOBUTAMINA", conc: "250mg/50ml", dose: "7 mcg/kg/min" },
            { name: "PROPOFOL 2%", conc: "20mg/ml", dose: "3 mg/kg/h" },
            { name: "FENTANYL", conc: "500mcg/50ml", dose: "100 mcg/h" },
            { name: "MIDAZOLAM", conc: "50mg/50ml", dose: "5 mg/h" },
            { name: "ROKURONIUM", conc: "100mg/50ml", dose: "10 mg/h" },
            { name: "INSULINA", conc: "50j/50ml", dose: "4 j/h" },
            { name: "HEPARYNA (1ml/1j)", conc: "1ml/1j", dose: "wlew dotętniczy 1ml/godz" },
            { name: "CYTRYNIAN (CRRT)", conc: "Prismocitrate 18/0", dose: "wg protokołu CRRT" }
        ],
        periodicDrugs: [
            { name: "MEROPENEM", dose: "1g (OUN: 2g)", route: "wlew i.v. 3h", freq: "co 8h" },
            { name: "WANKOMYCYNA", dose: "15-20mg/kg", route: "wlew i.v. >=1h", freq: "co 12h + TDM" },
            { name: "LINEZOLID", dose: "600mg", route: "wlew i.v. 30-120min", freq: "co 12h" },
            { name: "MIKAFUNGINA", dose: "100mg", route: "wlew i.v. 1h", freq: "co 24h" },
            { name: "HYDROKORTYZON", dose: "50mg", route: "i.v.", freq: "co 6h" },
            { name: "FUROSEMID", dose: "40mg", route: "i.v.", freq: "co 6h" },
            { name: "SPIRONOLAKTON", dose: "50mg", route: "p.o. (sonda)", freq: "co 24h" },
            { name: "PANTOPRAZOL", dose: "40mg", route: "i.v.", freq: "co 12h" },
            { name: "ENOKSAPARYNA", dose: "40mg (profil.)", route: "s.c.", freq: "co 24h" },
            { name: "METAMIZOL", dose: "1g (max 5g/d)", route: "i.v.", freq: "co 6h" },
            { name: "PARACETAMOL", dose: "1g (max 4g/d)", route: "i.v.", freq: "co 6h" },
            { name: "METOKLOPRAMID", dose: "10mg", route: "i.v.", freq: "co 8h" },
            { name: "ONDANSETRON", dose: "4mg", route: "i.v.", freq: "co 8h" },
            { name: "SALBUTAMOL (NEBULIZACJA)", dose: "2.5mg", route: "nebulizacja", freq: "co 4h" },
            { name: "BERODUAL", dose: "1ml", route: "nebulizacja", freq: "co 6h" },
            { name: "ACETYLOCYSTEINA", dose: "300mg", route: "nebulizacja", freq: "co 8h" },
            { name: "BUDESONIDE (NEBULIZACJA)", dose: "0.5mg", route: "nebulizacja", freq: "co 12h" }
        ],
        fluids: [
            { name: "Plasmalyte", volume: "1000", rate: "80", additives: ["+ KCl 15% 20ml", "+ MgSO4 20% 10ml"] },
            { name: "Albuminy 20%", volume: "100", rate: "25" },
            { name: "NaCl 0.9%", volume: "500", rate: "20" }
        ],
        nutrition: [
            { type: "Żywienie dojelitowe", prep: "Nutrison Multi Fibre 1000ml (1 kcal/ml)", rate: "30" },
            { type: "Żywienie pozajelitowe", prep: "SmofKabiven 1477ml (1.1 kcal/ml)", rate: "50" }
        ],
        procedures: [
            { time: "co 1h", name: "Diureza" },
            { time: "co 1h", name: "Glikemia" },
            { time: "co 2h", name: "Zmiany ułożenia" },
            { time: "co 4h", name: "Toaleta drzewa oskrzelowego" },
            { time: "co 4h", name: "Kontrola zalegań" },
            { time: "co 4h", name: "Gazometria tętnicza" },
            { time: "co 6h", name: "Profilaktyka odleżyn" },
            { time: "co 8h", name: "IAP" },
            { time: "co 8h", name: "OCŻ" },
            { time: "co 12h", name: "CRRT - kontrola obwodu" },
            { time: "codziennie", name: "RTG klatki piersiowej przyłóżkowe" },
            { time: "codziennie", name: "Kinezyterapia" },
            { time: "codziennie", name: "Zmiana opatrunku CVC" },
            { time: "codziennie", name: "Bilans płynów 24h" },
            { time: "codziennie", name: "Morfologia + elektrolity + kreatynina + CRP/PCT" },
            { time: "2x tyg", name: "Posiew krwi" }
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
        'NORADRENALINA': { max: 2.0, unit: 'mcg/kg/min' },
        'ADRENALINA': { max: 0.5, unit: 'mcg/kg/min' },
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
        const autoSaveKey = `autosave_${toStorageSlug(patientName)}`;
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
    const autoSaveKey = `autosave_${toStorageSlug(patientName)}`;
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

// Proponuje przywrocenie auto-zapisu, gdy uzytkownik wpisze nazwe pacjenta,
// dla ktorego istnieje swiezy autosave, a biezaca karta jest pusta (nie
// nadpisujemy aktywnej pracy). Pyta raz na sesje dla danego klucza.
let _autosaveOfferedKeys = new Set();
function maybeOfferAutosaveRestore() {
    const nameEl = document.getElementById('patientNameInput');
    const patientName = nameEl ? nameEl.value.trim() : '';
    if (!patientName) return;
    const key = `autosave_${toStorageSlug(patientName)}`;
    if (_autosaveOfferedKeys.has(key)) return;
    if (!localStorage.getItem(key)) return;
    const st = getCardState();
    const hasContent = (st.tables.continuous || []).some(d => d.name) ||
                       (st.tables.periodic || []).some(d => d.name) ||
                       (st.tables.fluids || []).some(f => f.name);
    if (hasContent) return; // jest juz tresc - nie przeszkadzamy
    _autosaveOfferedKeys.add(key);
    restoreFromAutosave();
}

// Ostrzezenie przed utrata niezapisanych zmian (zamkniecie / odswiezenie).
window.addEventListener('beforeunload', function (e) {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

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
    // Offline / brak biblioteki SortableJS (np. CDN niedostepny) - nie wywalaj
    // aplikacji; przeciaganie wierszy po prostu nie bedzie dostepne.
    if (typeof Sortable === 'undefined') return;
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
        const nameInput = lastRow.querySelector('.drug-name');
        const concInput = lastRow.querySelector('input[id$="_conc"]');
        const doseInput = lastRow.querySelector('.dose');
        const goalInput = lastRow.querySelector('.titration-goal');
        const rateInput = lastRow.querySelector('.infusion-rate');
        if (nameInput) nameInput.value = drug.name;
        if (concInput) concInput.value = drug.conc;
        if (doseInput) doseInput.value = drug.dose;
        if (goalInput) goalInput.value = drug.goal || continuousDrugTitrationDefaults[normalizeDrugName(drug.name)] || '';
        if (rateInput && drug.rate) rateInput.value = drug.rate;
    });
    
    template.periodicDrugs?.forEach(drug => {
        addPeriodicDrug();
        const lastRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const drugNameInput = lastRow.querySelector('.drug-name');
        const doseInput = lastRow.querySelector('.dose');
        const routeInput = lastRow.querySelector('.route');
        const freqInput = lastRow.querySelector('.frequency');
        const scheduleInput = lastRow.querySelector('.schedule-line');
        
        // ZMIANA: Sprawdzamy, czy wartość z szablonu istnieje, zanim ją przypiszemy
        if (drug.name) drugNameInput.value = drug.name;
        fillPeriodicDrugData(drugNameInput); // Ważne, aby wywołać po ustawieniu nazwy leku
        
        if(drug.dose) doseInput.value = drug.dose;
        if(drug.route) routeInput.value = drug.route;
        if(drug.freq) freqInput.value = drug.freq;
        updatePeriodicSchedule(lastRow, true);
        if(scheduleInput && drug.schedule) {
            scheduleInput.value = drug.schedule;
            scheduleInput.dataset.manual = 'true';
        }
    });
    
    template.fluids?.forEach(fluid => {
        addFluid();
        const lastRow = document.querySelector('#fluidsTable tbody tr:last-child');
        const nameInput = lastRow.querySelector('.fluid-name');
        const additive1Input = lastRow.querySelector('.additive-1');
        const additive2Input = lastRow.querySelector('.additive-2');
        const volumeInput = lastRow.querySelector('.fluid-volume');
        const rateInput = lastRow.querySelector('.fluid-rate');
        
        if (nameInput) nameInput.value = fluid.name;
        if (fluid.additives && Array.isArray(fluid.additives)) {
            if (fluid.additives[0]) additive1Input.value = fluid.additives[0];
            if (fluid.additives[1]) additive2Input.value = fluid.additives[1];
        }
        if (volumeInput) volumeInput.value = fluid.volume;
        if (rateInput) rateInput.value = fluid.rate;
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

    const notesTextarea = document.querySelector('.notes-section textarea');
    if (notesTextarea && template.notes) {
        notesTextarea.value = template.notes;
    }
    
    calculateIcuDay(); // Przelicz dobę OIT z daty przyjęcia szablonu
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
        headerData: {
            targetsInput: currentState.header.targetsInput || '',
            holdOrdersInput: currentState.header.holdOrdersInput || '',
            antibioticDayInput: currentState.header.antibioticDayInput || '',
            antibioticReviewInput: currentState.header.antibioticReviewInput || '',
            antibioticPlanInput: currentState.header.antibioticPlanInput || ''
        },
        continuousDrugs: currentState.tables.continuous.filter(drug => drug.name).map(drug => ({ name: drug.name, conc: drug.conc, dose: drug.dose, goal: drug.goal })),
        periodicDrugs: currentState.tables.periodic.filter(drug => drug.name).map(drug => ({ name: drug.name, dose: drug.dose, route: drug.route, freq: drug.freq, schedule: drug.schedule })),
        fluids: currentState.tables.fluids.filter(fluid => fluid.name).map(fluid => ({ name: fluid.name, additives: fluid.additives, volume: fluid.volume, rate: fluid.rate })),
        nutrition: currentState.tables.nutrition.filter(nutrition => nutrition.type).map(nutrition => ({ type: nutrition.type, prep: nutrition.prep, rate: nutrition.rate })),
        procedures: currentState.tables.procedures.filter(proc => proc.name).map(proc => ({ time: proc.time, name: proc.name })),
        notes: currentState.notes
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
// Żywienie dojelitowe ma edytowalną przerwę w podaży (domyślnie 6:00-10:00 = 4h),
// więc podaż dobowa trwa 24h - długość przerwy. Pozajelitowe zawsze przez pełne 24h.
const PARENTERAL_FEEDING_HOURS = 24;
const DEFAULT_ENTERAL_FEEDING_HOURS = 20;

// Pola przerwy to zwykły tekst (24h, bez AM/PM). Podczas pisania wstawiamy
// dwukropek po 2 cyfrach; po opuszczeniu pola normalizujemy do poprawnego
// HH:MM (zegar 24h), żeby literówka nie psuła liczenia godzin podaży.
function formatBreakTimeInput(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = digits.length <= 2 ? digits : digits.slice(0, 2) + ':' + digits.slice(2);
}

function normalizeBreakTime(input) {
    const digits = input.value.replace(/\D/g, '');
    if (!digits) { input.value = ''; return; }
    let h = parseInt(digits.slice(0, 2), 10);
    let m = digits.length > 2 ? parseInt(digits.slice(2, 4), 10) : 0;
    if (isNaN(h)) h = 0;
    if (isNaN(m)) m = 0;
    h = Math.min(23, Math.max(0, h));
    m = Math.min(59, Math.max(0, m));
    input.value = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

// Oblicza dobową liczbę godzin podaży żywienia dojelitowego na podstawie pól przerwy.
function getEnteralFeedingHours() {
    const startEl = document.getElementById('enteralBreakStart');
    const endEl = document.getElementById('enteralBreakEnd');
    if (!startEl || !endEl || !startEl.value || !endEl.value) return DEFAULT_ENTERAL_FEEDING_HOURS;

    const [sh, sm] = startEl.value.split(':').map(Number);
    const [eh, em] = endEl.value.split(':').map(Number);
    let breakMinutes = (eh * 60 + em) - (sh * 60 + sm);
    if (breakMinutes < 0) breakMinutes += 24 * 60; // przerwa przechodząca przez północ
    if (breakMinutes >= 24 * 60) breakMinutes = 0;  // start = koniec -> brak przerwy

    let feedingHours = 24 - breakMinutes / 60;
    if (feedingHours < 0) feedingHours = 0;
    if (feedingHours > 24) feedingHours = 24;
    return feedingHours;
}

// Aktualizuje etykietę z liczbą godzin podaży obok pól przerwy.
function updateEnteralBreakLabel() {
    const label = document.getElementById('enteralFeedingHoursLabel');
    if (!label) return;
    const h = getEnteralFeedingHours();
    label.textContent = Number.isInteger(h) ? h : h.toFixed(1).replace('.', ',');
}

function getNutritionHours(row) {
    const typeInput = row.querySelector('.nutrition-type');
    const typeValue = typeInput ? typeInput.value.toLowerCase() : '';
    return typeValue.includes('dojelitowe') ? getEnteralFeedingHours() : PARENTERAL_FEEDING_HOURS;
}

function updateSummaries() {
    updateEnteralBreakLabel();
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
        totalFluids += rate * getNutritionHours(row);
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
            totalKcal += kcalPerMl * rate * getNutritionHours(row);
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
    const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?.*?(mcg|mg|j)\s*(\/kg)?\s*\/(min|h)/i; 
    const doseMatch = doseStr.match(doseRegex); 
    if (!doseMatch) { 
        rateOutput.value = ''; 
        return; 
    } 
    let doseValue1 = parseFloat(doseMatch[1]); 
    let doseValue2 = doseMatch[2] ? parseFloat(doseMatch[2]) : null; 
    let doseUnit = doseMatch[3].toLowerCase(); 
    const perKg = doseMatch[4]; 
    const perTime = doseMatch[5].toLowerCase(); 
    
    const concRegex = /([\d\.]+)\s*(mg|mcg|j)\s*\/(?:([\d\.]+)\s*)?ml/i; 
    const concMatch = concStr.match(concRegex); 
    let concentrationPerMl; 
    if (concMatch) { 
        let totalMass = parseFloat(concMatch[1]); 
        let massUnit = concMatch[2].toLowerCase(); 
        const totalVolume = concMatch[3] ? parseFloat(concMatch[3]) : 1; 
        
        if (doseUnit === 'mg' && massUnit === 'mcg') totalMass /= 1000;
        if (doseUnit === 'mcg' && massUnit === 'mg') totalMass *= 1000;

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
    applyNewDrugMarkers();
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
            <div class="row-helper-line"><span class="new-drug-badge" style="display:none;">NOWY</span></div>
            <input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="continuousDrugsList" autocomplete="off" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" />
            <input type="text" class="drug-input" placeholder="Stężenie" autocomplete="off" id="${rowId}_conc" oninput="calculateInfusionRate(this.closest('tr').querySelector('.dose'))" />
        </td>
        <td>
            <input type="text" class="drug-input dose" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" oninput="calculateInfusionRate(this)" />
            <input type="text" class="drug-input secondary-line-input titration-goal" placeholder="Cel / titracja" autocomplete="off" id="${rowId}_goal" oninput="markAsChanged()" />
        </td>
        <td><input type="text" class="drug-input infusion-rate" placeholder="0,0" autocomplete="off" /></td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`; 
    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
    applyNewDrugMarkers();
}

function fillContinuousDrugData(input, rowId) { 
    const drugName = input.value.toUpperCase(); 
    const data = continuousDrugsData[drugName];
    if (data) { 
        const concInput = document.getElementById(rowId + '_conc'); 
        const doseInput = document.getElementById(rowId + '_dose'); 
        const goalInput = document.getElementById(rowId + '_goal');
        const row = input.closest('tr'); 
        const rateOutput = row.querySelector('.infusion-rate'); 
        if(concInput) concInput.value = data.concentration; 
        if(doseInput) doseInput.value = data.dose; 
        if(goalInput && !goalInput.value && continuousDrugTitrationDefaults[drugName]) {
            goalInput.value = continuousDrugTitrationDefaults[drugName];
        }
        if (data.fixedRate && rateOutput) { 
            rateOutput.value = data.fixedRate; 
        } else if (doseInput) { 
            calculateInfusionRate(doseInput); 
        }
        validateDosage(drugName, data.dose);
        if (data.note) {
            showToast('Uwaga kliniczna', `${drugName}: ${data.note}`, 'warning', 7000);
        }
    } 
    applyNewDrugMarkers();
}

function normalizeDrugName(name) {
    return (name || '').trim().toUpperCase();
}

function extractScheduleStart(frequencyText) {
    const text = frequencyText || '';
    const match = text.match(/(?:od|start)\s*(\d{1,2})(?::(\d{2}))?/i) || text.match(/\b(\d{1,2}):(\d{2})\b/);
    if (!match) return null;
    const hours = String(Math.min(23, Math.max(0, parseInt(match[1], 10) || 0))).padStart(2, '0');
    const minutes = String(Math.min(59, Math.max(0, parseInt(match[2] || '0', 10) || 0))).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function extractFixedHourInterval(frequencyText) {
    const text = (frequencyText || '').toLowerCase();
    if (!text) return null;
    if (/doraź|na zlecenie|wg|jednoraz|profil\.\s*\/|tx|->|→|co\s*\d+\s*-\s*\d+/i.test(text)) return null;
    const match = text.match(/co\s*(\d{1,2})\s*h/);
    if (!match) return null;
    const interval = parseInt(match[1], 10);
    if (!interval || interval > 24) return null;
    return interval;
}

function getDefaultStartForInterval(interval) {
    if (interval === 24) return '08:00';
    if (interval === 12) return '08:00';
    if (interval === 8) return '06:00';
    if (interval === 6) return '06:00';
    if (interval === 4) return '06:00';
    return '08:00';
}

function buildScheduleFromFrequency(frequencyText) {
    const interval = extractFixedHourInterval(frequencyText);
    if (!interval) return '';

    const start = extractScheduleStart(frequencyText) || getDefaultStartForInterval(interval);
    const [baseHour, baseMinute] = start.split(':').map(part => parseInt(part, 10) || 0);
    const times = [];

    for (let i = 0; i < 24; i += interval) {
        const hour = (baseHour + i) % 24;
        times.push(`${String(hour).padStart(2, '0')}:${String(baseMinute).padStart(2, '0')}`);
        if (interval === 24) break;
    }

    return times.join(' / ');
}

function updatePeriodicSchedule(row, force = false) {
    if (!row) return;
    const frequencyInput = row.querySelector('.frequency');
    const scheduleInput = row.querySelector('.schedule-line');
    if (!frequencyInput || !scheduleInput) return;

    const autoSchedule = buildScheduleFromFrequency(frequencyInput.value);
    const hasExplicitStart = Boolean(extractScheduleStart(frequencyInput.value));

    if (autoSchedule) {
        if (force || !scheduleInput.value || scheduleInput.dataset.manual !== 'true' || hasExplicitStart) {
            scheduleInput.value = autoSchedule;
            scheduleInput.dataset.auto = 'true';
            if (hasExplicitStart || force) scheduleInput.dataset.manual = '';
        }
    } else if (force || scheduleInput.dataset.auto === 'true') {
        scheduleInput.value = '';
        scheduleInput.dataset.auto = '';
        if (force) scheduleInput.dataset.manual = '';
    }
}

function handlePeriodicFrequencyInput(input) {
    const row = input.closest('tr');
    updatePeriodicSchedule(row);
    markAsChanged();
}

function markScheduleAsManual(input) {
    input.dataset.manual = input.value.trim() ? 'true' : '';
    input.dataset.auto = '';
    markAsChanged();
}

function getDrugSnapshotStorageKey() {
    const historyNumber = document.getElementById('historyNumberInput')?.value.trim();
    const patientName = document.getElementById('patientNameInput')?.value.trim();
    const rawKey = historyNumber || patientName;
    if (!rawKey) return '';
    return `printed_snapshot_${toStorageSlug(rawKey)}`;
}

function getPrintedDrugSnapshot() {
    const storageKey = getDrugSnapshotStorageKey();
    if (!storageKey) return null;
    try {
        return JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch (error) {
        return null;
    }
}

function savePrintedDrugSnapshot(state) {
    const storageKey = getDrugSnapshotStorageKey();
    if (!storageKey) return;
    const icuDay = parseInt(document.getElementById('icuDayInput')?.value, 10) || null;
    const snapshot = {
        savedAt: new Date().toISOString(),
        icuDay: icuDay,
        continuous: state.tables.continuous.filter(drug => drug.name).map(drug => normalizeDrugName(drug.name)),
        periodic: state.tables.periodic.filter(drug => drug.name).map(drug => normalizeDrugName(drug.name))
    };
    localStorage.setItem(storageKey, JSON.stringify(snapshot));
}

function setNewDrugBadge(row, isNew) {
    const badge = row.querySelector('.new-drug-badge');
    if (!badge) return;
    badge.style.display = isNew ? 'inline-flex' : 'none';
}

function applyNewDrugMarkers() {
    const icuDay = parseInt(document.getElementById('icuDayInput')?.value, 10) || 0;
    const snapshot = getPrintedDrugSnapshot();
    const hasComparableSnapshot = snapshot && Array.isArray(snapshot.continuous) && Array.isArray(snapshot.periodic) &&
        (snapshot.icuDay === icuDay - 1 || snapshot.icuDay === icuDay);

    document.querySelectorAll('#continuousDrugsTbody tr').forEach(row => {
        const drugName = normalizeDrugName(row.querySelector('.drug-name')?.value);
        if (!drugName) return setNewDrugBadge(row, false);
        const isNew = icuDay <= 1 ? true : (hasComparableSnapshot ? !snapshot.continuous.includes(drugName) : false);
        setNewDrugBadge(row, isNew);
    });

    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => {
        const drugName = normalizeDrugName(row.querySelector('.drug-name')?.value);
        if (!drugName) return setNewDrugBadge(row, false);
        const isNew = icuDay <= 1 ? true : (hasComparableSnapshot ? !snapshot.periodic.includes(drugName) : false);
        setNewDrugBadge(row, isNew);
    });
}

function hasAntibioticOrders(state) {
    return state.tables.continuous.some(drug => antibioticDrugPatterns.some(pattern => normalizeDrugName(drug.name).includes(pattern))) ||
        state.tables.periodic.some(drug => antibioticDrugPatterns.some(pattern => normalizeDrugName(drug.name).includes(pattern)));
}

function isAmbiguousFrequencyText(text) {
    const value = (text || '').toLowerCase();
    return /co\s*\d+\s*-\s*\d+/i.test(value) || /profil\.\s*\/|tx|→|->/.test(value);
}

function addPeriodicDrug() { 
    const tbody = document.querySelector('#periodicDrugsTbody'); 
    const newRow = document.createElement('tr'); 
    const rowId = 'per_' + Date.now(); 
    
    newRow.innerHTML = `
        <td class="drag-column no-print"><div class="drag-handle"><i class="fas fa-grip-vertical"></i></div></td>
        <td>
            <div class="row-helper-line"><span class="new-drug-badge" style="display:none;">NOWY</span></div>
            <input type="text" class="drug-input drug-name" placeholder="Nazwa leku" list="periodicDrugsList" autocomplete="off" onchange="fillPeriodicDrugData(this)" id="${rowId}_name" />
            <input type="text" class="drug-input dose" placeholder="Dawka" autocomplete="off" id="${rowId}_dose" oninput="markAsChanged()" />
        </td>
        <td> <input type="text" class="drug-input route" placeholder="i.v." autocomplete="off" id="${rowId}_route" />
        </td>
        <td> <input type="text" class="drug-input frequency" placeholder="np. co 8h od 7:00" autocomplete="off" id="${rowId}_freq" oninput="handlePeriodicFrequencyInput(this)" />
            <input type="text" class="drug-input secondary-line-input schedule-line" placeholder="Godziny podania" autocomplete="off" id="${rowId}_schedule" oninput="markScheduleAsManual(this)" />
            <span class="dose-reduction-notice" style="display:none; margin-left: 5px;">⚠️ Zredukowano</span>
        </td>
        <td><div class="signature-box-cell"></div></td>
        <td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button"><i class="fas fa-times-circle"></i></button></td>`;

    tbody.appendChild(newRow); 
    markAsChanged();
    initializeSortable();
    applyNewDrugMarkers();
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
        updatePeriodicSchedule(row, true);
        if (originalData.note) {
            showToast('Uwaga kliniczna', `${drugName}: ${originalData.note}`, 'warning', 7000);
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
        updatePeriodicSchedule(row, true);
    } 
    recalculateDose(row); 
    adjustSingleDoseForGfr(row); 
    applyNewDrugMarkers();
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
        <td><input type="number" class="drug-input fluid-volume" placeholder="ml" autocomplete="off" oninput="markAsChanged(); updateSummaries()" onchange="updateSummaries()" /></td>
        <td><input type="number" class="drug-input fluid-rate" placeholder="ml/h" autocomplete="off" oninput="markAsChanged(); updateSummaries()" onchange="updateSummaries()" /></td>
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
        <td><input type="number" class="drug-input nutrition-rate" placeholder="ml/h" autocomplete="off" id="${rowId}_rate" oninput="markAsChanged(); updateSummaries()" onchange="updateSummaries()" /></td>
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

// --- LOGIKA DAWKOWANIA (GFR, dawki /kg) ---
function recalculateDose(row) { 
    const doseInput = row.querySelector('.dose'); 
    if (!doseInput) return;
    const originalDose = doseInput.dataset.originalDose; 
    const weight = parseFloat(document.getElementById('patientWeight').value); 
    
    if (originalDose && originalDose.includes('/kg') && weight > 0) { 
        const doseRegex = /([\d\.,]+)(?:\s*-\s*([\d\.,]+))?\s*(mcg|mg|g|j)?\s*\/kg/i; 
        const matches = originalDose.match(doseRegex); 
        if (matches) { 
            const unit = (matches[3] || 'mg').toLowerCase();
            const formatWeightDose = (dose) => {
                const total = parseFloat(dose.replace(',', '.')) * weight;
                const rounded = unit === 'g' ? Math.round(total * 10) / 10 : Math.round(total);
                return `${String(rounded).replace('.', ',')}${unit}`;
            };
            const totalDose1 = formatWeightDose(matches[1]); 
            if (matches[2]) { 
                const totalDose2 = formatWeightDose(matches[2]); 
                doseInput.value = `${totalDose1}-${totalDose2} (${originalDose})`; 
            } else { 
                doseInput.value = `${totalDose1} (${originalDose})`; 
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
                const doseRegex = /([\d\.,]+)\s*(mcg|mg|g|j)?\s*\/kg/i; 
                const matches = appliedRule.dose.match(doseRegex);
                if(matches) { 
                    const unit = (matches[2] || 'mg').toLowerCase();
                    const total = parseFloat(matches[1].replace(',', '.')) * weight;
                    const rounded = unit === 'g' ? Math.round(total * 10) / 10 : Math.round(total);
                    finalDose = `${String(rounded).replace('.', ',')}${unit} (${appliedRule.dose})`; 
                }
            }
        }
        
        if (doseInput) doseInput.value = finalDose;
        if (appliedRule.frequency && freqInput) {
            freqInput.value = appliedRule.frequency;
            updatePeriodicSchedule(row, true);
        }
        
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
        if (key.includes('OMEGAFLEX') || key.includes('Nutriflex') || key.includes('SmofKabiven') || key.includes('Kabiven') || key.includes('Aminomix')) {
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
    applyNewDrugMarkers();
    updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
}

// --- ENHANCED SAVE/LOAD SYSTEM ---
function toStorageSlug(value) {
    return (value || 'karta')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || 'karta';
}

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
    
    const cardState = getCardState();

    try {
        cardState.metadata = {
            savedAt: new Date().toISOString(),
            version: APP_VERSION,
            patientSummary: {
                name: patientName,
                historyNumber: historyNumber,
                diagnosis: document.getElementById('diagnosisInput').value || 'Brak rozpoznania'
            }
        };

        upsertPatientSnapshot(patientName, historyNumber, cardState);

        hasUnsavedChanges = false;
        updateAutosaveIndicator('saved', 'Wszystkie zmiany zapisane');
        showToast('Zapisano', 'Karta została zapisana w kartotece pacjenta.', 'success');

    } catch (e) {
        console.error("Błąd zapisu:", e);
        showToast('Błąd zapisu', 'Wystąpił błąd podczas zapisu karty.', 'error');
    }
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
        const nameInput = newRow.querySelector('.drug-name');
        const concInput = newRow.querySelector('input[id$="_conc"]');
        const doseInput = newRow.querySelector('.dose');
        const goalInput = newRow.querySelector('.titration-goal');
        const rateInput = newRow.querySelector('.infusion-rate');
        if (nameInput) nameInput.value = data.name || '';
        if (concInput) concInput.value = data.conc || '';
        if (doseInput) doseInput.value = data.dose || '';
        if (goalInput) goalInput.value = data.goal || continuousDrugTitrationDefaults[normalizeDrugName(data.name)] || '';
        if (rateInput) rateInput.value = data.rate || '';
    });
    
    (tables.periodic || []).forEach(data => {
        addPeriodicDrug();
        const newRow = document.querySelector('#periodicDrugsTbody tr:last-child');
        const nameInput = newRow.querySelector('.drug-name');
        const doseInput = newRow.querySelector('.dose');
        const routeInput = newRow.querySelector('.route');
        const freqInput = newRow.querySelector('.frequency');
        const scheduleInput = newRow.querySelector('.schedule-line');
        
        if (nameInput) nameInput.value = data.name || '';
        if (nameInput) fillPeriodicDrugData(nameInput); // Ustaw dane bazowe dla przeliczeń
        if (doseInput) doseInput.value = data.dose || '';
        if (routeInput) routeInput.value = data.route || '';
        if (freqInput) freqInput.value = data.freq || '';
        updatePeriodicSchedule(newRow, true);
        if (scheduleInput && data.schedule) {
            scheduleInput.value = data.schedule;
            scheduleInput.dataset.manual = 'true';
        }
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
        // POPRAWKA: Prawidłowe przypisanie dodatków z tablicy do poszczególnych pól
        if(data.additives && Array.isArray(data.additives)) {
            if(additive1Input && data.additives[0]) additive1Input.value = data.additives[0];
            if(additive2Input && data.additives[1]) additive2Input.value = data.additives[1];
        } else {
            // Starszy format danych, gdzie 'additives' było pojedynczym stringiem
            // Dzielimy string po przecinku lub innym separatorze
            const additivesString = data.additives || '';
            const additivesArray = additivesString.split(',').map(a => a.trim()).filter(a => a);
            if(additive1Input && additivesArray[0]) additive1Input.value = additivesArray[0];
            if(additive2Input && additivesArray[1]) additive2Input.value = additivesArray[1];
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
    applyNewDrugMarkers();
    
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
        cardState.tables.continuous.push({
            name: row.querySelector('.drug-name')?.value || '',
            conc: row.querySelector('input[id$="_conc"]')?.value || '',
            dose: row.querySelector('.dose')?.value || '',
            goal: row.querySelector('.titration-goal')?.value || '',
            rate: row.querySelector('.infusion-rate')?.value || ''
        });
    });
    
    document.querySelectorAll('#periodicDrugsTbody tr').forEach(row => {
        cardState.tables.periodic.push({
            name: row.querySelector('.drug-name')?.value || '',
            dose: row.querySelector('.dose')?.value || '',
            route: row.querySelector('.route')?.value || '',
            freq: row.querySelector('.frequency')?.value || '',
            schedule: row.querySelector('.schedule-line')?.value || ''
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
            if (tbody.closest('#manualDrugsTable') || tbody.closest('#changeAnnexTable')) return;
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

// Rozpoczyna pusta karte dla NOWEGO pacjenta: czysci karte i odznacza
// aktualnie wybranego pacjenta (zaczynamy od zera).
function startNewPatient() {
    if (!confirm('Rozpocząć kartę dla NOWEGO pacjenta?\nBieżące, niezapisane dane zostaną wyczyszczone.')) return;
    clearCard(true);
    try { localStorage.removeItem(ACTIVE_PATIENT_KEY); } catch (e) {}
    if (typeof updateActivePatientBadge === 'function') updateActivePatientBadge();
    if (typeof renderRecentPatients === 'function') renderRecentPatients();
    showToast('Nowy pacjent', 'Pusta karta gotowa dla nowego pacjenta', 'success', 2500);
}

function runPrePrintCheck(showDialog = false, options = {}) {
    const warnings = [];
    const anonymous = Boolean(options.anonymous);
    const valueOf = (id) => document.getElementById(id)?.value.trim() || '';
    const state = getCardState();

    if (!anonymous && !valueOf('patientNameInput')) warnings.push('Brak imienia i nazwiska pacjenta.');
    if (!anonymous && !valueOf('historyNumberInput')) warnings.push('Brak numeru historii.');
    if (!valueOf('diagnosisInput')) warnings.push('Brak rozpoznania.');
    if (!valueOf('roomInput')) warnings.push('Brak sali/łóżka.');
    if (!valueOf('allergiesInput')) warnings.push('Brak alergii - wpisz "brak", jeśli nie stwierdzono.');
    if (!valueOf('gfrInput')) warnings.push('Brak GFR - korekty nerkowe nie będą kompletne.');

    const allDrugRows = [
        ...state.tables.continuous.map(drug => ({ ...drug, type: 'ciągły' })),
        ...state.tables.periodic.map(drug => ({ ...drug, type: 'okresowy' }))
    ];
    const hasWeightBasedDose = allDrugRows.some(drug => `${drug.dose || ''}`.includes('/kg'));
    if (hasWeightBasedDose && !valueOf('patientWeight')) {
        warnings.push('Są dawki zależne od masy ciała, ale brakuje masy pacjenta.');
    }

    state.tables.continuous.forEach((drug, index) => {
        if (drug.name && (!drug.conc || !drug.dose)) {
            warnings.push(`Lek ciągły #${index + 1}: uzupełnij stężenie i dawkę.`);
        }
        if (drug.name && /NORADRENALINA|ADRENALINA|DOBUTAMINA|MILRINON|PROPOFOL|MIDAZOLAM|DEKSMEDETOMIDYNA|FENTANYL|REMIFENTANYL|MORFINA|INSULINA|FUROSEMID/i.test(drug.name) && !drug.goal) {
            warnings.push(`Lek ciągły #${index + 1}: uzupełnij cel / titrację.`);
        }
    });

    state.tables.periodic.forEach((drug, index) => {
        if (drug.name && (!drug.dose || !drug.route || !drug.freq)) {
            warnings.push(`Lek okresowy #${index + 1}: uzupełnij dawkę, drogę i częstość.`);
        }
        if (drug.name && extractFixedHourInterval(drug.freq) && !drug.schedule) {
            warnings.push(`Lek okresowy #${index + 1}: brakuje jednoznacznych godzin podań.`);
        }
        if (drug.name && isAmbiguousFrequencyText(drug.freq)) {
            warnings.push(`Lek okresowy #${index + 1}: doprecyzuj częstość "${drug.freq}" lub wpisz ręcznie godziny podania.`);
        }
    });

    state.tables.fluids.forEach((fluid, index) => {
        if (fluid.name && !fluid.rate) {
            warnings.push(`Płyn #${index + 1}: brakuje prędkości wlewu.`);
        }
    });

    state.tables.nutrition.forEach((nutrition, index) => {
        if ((nutrition.type || nutrition.prep) && !nutrition.rate) {
            warnings.push(`Żywienie #${index + 1}: brakuje prędkości podaży.`);
        }
    });

    if (!state.tables.periodic.some(drug => drug.name)) {
        warnings.push('Brak leków okresowych na planie dnia.');
    }
    if (!state.tables.procedures.some(proc => proc.name)) {
        warnings.push('Brak procedur/obserwacji dla pielęgniarek.');
    }

    const allergies = valueOf('allergiesInput').toLowerCase();
    const betaLactams = ['AMOKSYCYLINA', 'PIPERACYLINA', 'CEF', 'MEROPENEM', 'IMIPENEM', 'ERTAPENEM', 'KLOKSACYLINA'];
    const hasBetaLactam = state.tables.periodic.some(drug => betaLactams.some(pattern => (drug.name || '').toUpperCase().includes(pattern)));
    if (hasBetaLactam && /(penicyl|betalaktam|beta-laktam|cefalosporyn)/i.test(allergies)) {
        warnings.push('Alergia sugeruje ryzyko po beta-laktamach, a w zleceniach jest beta-laktam.');
    }

    // Pola planu antybiotykowego (AB od dnia / rewizja-posiewy / plan) oraz
    // "Parametry docelowe / cele na dzis" sa OPCJONALNE - puste nie sa
    // zglaszane jako brak w kontroli przed wydrukiem.

    if (showDialog) {
        if (warnings.length) {
            alert(`Kontrola przed drukiem:\n\n${warnings.map(item => `- ${item}`).join('\n')}`);
        } else {
            showToast('Kontrola OK', 'Karta wygląda na kompletną do wydruku.', 'success');
        }
    }

    return warnings;
}

// --- Auto-skalowanie wydruku: cel max 2 strony A4 ---
// Wysokosci wierszy w druku sa male i w miare stale, wiec szacujemy wysokosc
// z liczby wierszy i skalujemy #card-container zoomem tak, by zmiescic sie na
// 2 stronach. Mala karta -> zoom 1 (bez zmian); duza -> zoom < 1.
function countRows(selector) {
    const el = document.querySelector(selector);
    return el ? el.querySelectorAll('tr').length : 0;
}

function setPrintScale() {
    const card = document.getElementById('card-container');
    if (!card) return;

    const contPer = countRows('#continuousDrugsTbody') + countRows('#periodicDrugsTbody');
    const fluidsNutr = countRows('#fluidsTable tbody') + countRows('#nutritionTable tbody');
    const proc = countRows('#proceduresTable tbody');

    // Stale kalibracyjne (px @96dpi) - latwe do dostrojenia:
    const ROW_DRUG = 22;    // wiersz leku ciaglego/okresowego (czesto 2 linie)
    const ROW_OTHER = 14;   // plyny / zywienie / procedury
    const ONE_PAGE = 1030;  // uzyteczna wysokosc 1 strony A4

    // STRONA 1: naglowek + dane pacjenta + plan + leki + plynoterapia/zywienie
    const block1 = 180   // naglowek + karta pacjenta + plan kliniczny
                 + 56    // naglowki + naglowki tabel: leki ciagle + okresowe
                 + 54    // naglowek plynoterapii + 2 naglowki tabel + notka
                 + contPer * ROW_DRUG
                 + fluidsNutr * ROW_OTHER;

    // STRONA 2: PROCEDURY + NOWE LEKI (reczna) + uwagi + podpis
    const block2 = 28               // naglowek PROCEDURY + naglowek tabeli
                 + proc * ROW_OTHER
                 + (28 + 4 * 31)     // NOWE LEKI: naglowek + naglowek + 4 wiersze
                 + 95;               // UWAGI: naglowek + pole uwag + podpis

    let scale = Math.min(1, ONE_PAGE / block1, ONE_PAGE / block2);
    scale = Math.max(scale, 0.45); // nie schodzimy ponizej 45% (czytelnosc)
    card.style.setProperty('--print-scale', scale.toFixed(3));
}

function resetPrintScale() {
    const card = document.getElementById('card-container');
    if (card) card.style.setProperty('--print-scale', '1');
}

// Na wydruku godziny podania leku okresowego (np. "06:00 / 14:00 / 22:00")
// przenosimy do kolumny "Podpis pielegniarki", rozlozone z odstepem, by
// pielegniarka mogla parafowac obok kazdej godziny.
function preparePrintAdminTimes() {
    const tbody = document.getElementById('periodicDrugsTbody');
    if (!tbody) return;
    tbody.querySelectorAll('tr').forEach(tr => {
        const scheduleEl = tr.querySelector('.schedule-line');
        const sigCell = tr.querySelector('.signature-box-cell');
        if (!sigCell) return;
        const val = scheduleEl ? (scheduleEl.value || '').trim() : '';
        const times = val ? val.split(/[\/,;]+/).map(s => s.trim()).filter(Boolean) : [];
        if (times.length) {
            sigCell.innerHTML = '<span class="admin-times">' +
                times.map(t => '<span class="admin-time">' + t.replace(/[<>&]/g, '') + '</span>').join('') +
                '</span>';
            sigCell.setAttribute('data-print-times', '1');
        }
    });
}

function clearPrintAdminTimes() {
    document.querySelectorAll('#periodicDrugsTbody .signature-box-cell[data-print-times]').forEach(c => {
        c.innerHTML = '';
        c.removeAttribute('data-print-times');
    });
}

window.addEventListener('beforeprint', function () { setPrintScale(); preparePrintAdminTimes(); });
window.addEventListener('afterprint', function () { resetPrintScale(); clearPrintAdminTimes(); });

function printCard() {
    preparePrintHeaderFields();
    setPrintScale();
    preparePrintAdminTimes();

    const warnings = runPrePrintCheck(false);
    if (warnings.length) {
        const shouldPrint = confirm(`Karta ma ostrzeżenia przed wydrukiem:\n\n${warnings.map(item => `- ${item}`).join('\n')}\n\nDrukować mimo to?`);
        if (!shouldPrint) return;
    }

    savePrintedDrugSnapshot(getCardState());
    window.print();
}

function preparePrintHeaderFields() {
    const roomInput = document.getElementById('roomInput');
    const roomInputPrint = document.getElementById('roomInputPrint');
    if (roomInput && roomInputPrint) {
        roomInputPrint.value = roomInput.value;
    }
}

// --- FILE OPERATIONS ---
function saveCardToFile() {
    const patientName = document.getElementById('patientNameInput').value.trim() || 'Pacjent';
    const historyNumber = document.getElementById('historyNumberInput').value.trim() || 'Historia';
    const cardState = getCardState();
    
    cardState.metadata = {
        exportedAt: new Date().toISOString(),
        version: APP_VERSION,
        patientSummary: {
            name: patientName,
            historyNumber: historyNumber,
            diagnosis: document.getElementById('diagnosisInput').value || 'Brak rozpoznania'
        }
    };
    
    const dataStr = JSON.stringify(cardState, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `karta_${toStorageSlug(patientName)}_${new Date().toISOString().split('T')[0]}.json`;
    
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

// --- BACKUP CALEJ KARTOTEKI (wszyscy pacjenci + szablony) ---
// Wszystkie dane zyja w localStorage jednej przegladarki. Eksport/import
// calej bazy do pliku JSON chroni przed utrata danych przy czyszczeniu
// przegladarki, awarii profilu czy przenosinach na inny komputer.
function exportAllData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        data[k] = localStorage.getItem(k);
    }
    const payload = {
        type: 'karta-oit-backup',
        version: APP_VERSION,
        exportedAt: new Date().toISOString(),
        count: Object.keys(data).length,
        data
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kartoteka_OIT_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup', `Wyeksportowano kartotekę (${payload.count} pozycji).`, 'success');
}

function importAllData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        let payload;
        try {
            payload = JSON.parse(e.target.result);
        } catch (err) {
            showToast('Błąd importu', 'Nieprawidłowy plik backupu.', 'error');
            return;
        }
        const data = payload && payload.data ? payload.data : null;
        if (!data || typeof data !== 'object' || payload.type !== 'karta-oit-backup') {
            showToast('Błąd importu', 'To nie jest plik backupu kartoteki.', 'error');
            return;
        }
        const n = Object.keys(data).length;
        if (!confirm(`Przywrócić kartotekę z pliku?\n\nPozycji: ${n}\nUtworzono: ${payload.exportedAt || '—'}\n\nUWAGA: dane o tych samych kluczach zostaną nadpisane danymi z pliku.`)) {
            return;
        }
        try {
            Object.keys(data).forEach(k => localStorage.setItem(k, data[k]));
        } catch (err) {
            showToast('Błąd importu', 'Brak miejsca w pamięci przeglądarki - import niepełny.', 'error');
            console.error('Import quota error:', err);
            return;
        }
        hasUnsavedChanges = false; // unikamy ostrzezenia beforeunload przy reload
        showToast('Backup', 'Kartoteka przywrócona. Odświeżam aplikację...', 'success');
        setTimeout(function () { location.reload(); }, 900);
    };
    reader.readAsText(file);
    event.target.value = '';
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
    preparePrintHeaderFields();
    initializeSortable();
    startAutosave();
    
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    Object.keys(customTemplates).forEach(key => {
        cardTemplates[key] = customTemplates[key];
    });

    try {
        migratePatientsFromLegacyCards();
        updateActivePatientBadge();
        renderRecentPatients();
    } catch (err) {
        console.warn('Patients init failed:', err);
    }
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.documentElement.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if(icon) icon.className = 'fas fa-sun';
    }
    
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').catch(function(err) {
                console.warn('Service worker registration failed:', err);
            });
        });
    }
    
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
        if(e.target.matches('#icuDayInput') || e.target.matches('#patientNameInput') || e.target.matches('#historyNumberInput')) {
            applyNewDrugMarkers();
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
            printCard();
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
    document.getElementById('roomInput').addEventListener('input', function() {
        document.getElementById('roomInputPrint').value = this.value;
    });
    document.getElementById('patientNameInput').addEventListener('input', applyNewDrugMarkers);
    document.getElementById('historyNumberInput').addEventListener('input', applyNewDrugMarkers);
    
    document.addEventListener('click', function(e) {
        const quickSearchResults = document.getElementById('quickSearchResults');
        if (quickSearchResults && !e.target.closest('.quick-search-bar')) {
            quickSearchResults.style.display = 'none';
        }
    });
    
    showToast('System gotowy', 'Karta zleceń OIT została załadowana', 'success', 3000);
});

// ============================================================
//  KARTOTEKA PACJENTÓW + HISTORIA KART (dzień po dniu)
// ============================================================

const PATIENTS_INDEX_KEY = 'patientsIndex';
const ACTIVE_PATIENT_KEY = 'activePatientId';

function getPatientId(name, historyNumber) {
    return `${toStorageSlug(name)}_${toStorageSlug(historyNumber)}`;
}

function getPatientsIndex() {
    try {
        return JSON.parse(localStorage.getItem(PATIENTS_INDEX_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

function savePatientsIndex(arr) {
    localStorage.setItem(PATIENTS_INDEX_KEY, JSON.stringify(arr));
}

function getPatientHistory(patientId) {
    try {
        return JSON.parse(localStorage.getItem(`patientHistory_${patientId}`) || '[]');
    } catch (e) {
        return [];
    }
}

function savePatientHistory(patientId, history) {
    localStorage.setItem(`patientHistory_${patientId}`, JSON.stringify(history));
}

function upsertPatientSnapshot(name, historyNumber, cardState) {
    if (!name || !historyNumber) return;
    const id = getPatientId(name, historyNumber);
    const header = cardState.header || {};
    const cardDate = header.mainDateInput || '';
    const icuDay = header.icuDayInput || '';
    const diagnosis = header.diagnosisInput || '';
    const pesel = header.peselInput || '';
    const admissionDate = header.admissionDateInput || '';
    const allergies = header.allergiesInput || '';
    const now = new Date().toISOString();

    // 1. Update patients index
    const list = getPatientsIndex();
    let patient = list.find(p => p.id === id);
    if (!patient) {
        patient = { id, name, historyNumber, pesel, admissionDate, allergies, createdAt: now };
        list.push(patient);
    } else {
        patient.name = name;
        patient.historyNumber = historyNumber;
        if (pesel) patient.pesel = pesel;
        if (admissionDate) patient.admissionDate = admissionDate;
        if (allergies) patient.allergies = allergies;
    }
    patient.lastDiagnosis = diagnosis;
    patient.lastSavedAt = now;
    savePatientsIndex(list);

    // 2. Add snapshot to history (one snapshot per cardDate - new save same day overwrites)
    const history = getPatientHistory(id);
    const snapKey = `snap_${id}_${now.replace(/[:.]/g, '-')}`;
    const stateClone = JSON.parse(JSON.stringify(cardState));
    stateClone.metadata = stateClone.metadata || {};
    stateClone.metadata.snapshotAt = now;

    // If a snapshot exists for the same cardDate today, replace it (so user editing same day's card doesn't bloat history)
    const sameDayIdx = history.findIndex(h => h.cardDate === cardDate && cardDate);
    if (sameDayIdx >= 0) {
        const oldSnap = history[sameDayIdx];
        if (oldSnap.snapKey) localStorage.removeItem(oldSnap.snapKey);
        history.splice(sameDayIdx, 1);
    }

    localStorage.setItem(snapKey, JSON.stringify(stateClone));
    history.unshift({
        snapKey,
        savedAt: now,
        cardDate,
        icuDay,
        diagnosis
    });
    savePatientHistory(id, history);

    // 3. Set as active patient
    localStorage.setItem(ACTIVE_PATIENT_KEY, id);
    updateActivePatientBadge();
}

function migratePatientsFromLegacyCards() {
    const list = getPatientsIndex();
    if (list.length > 0) return; // już zmigrowano lub używane nowy mechanizm
    const legacyIndex = JSON.parse(localStorage.getItem('savedCardsIndex') || '[]');
    if (legacyIndex.length === 0) return;

    legacyIndex.forEach(cardKey => {
        let data = null;
        try { data = JSON.parse(localStorage.getItem(cardKey)); } catch (e) {}
        if (!data || !data.metadata || !data.metadata.patientSummary) return;
        const ps = data.metadata.patientSummary;
        if (!ps.name || !ps.historyNumber) return;
        try {
            upsertPatientSnapshot(ps.name, ps.historyNumber, data);
        } catch (err) {
            console.warn('Migration entry failed:', cardKey, err);
        }
    });
    // Po migracji odznacz aktywnego pacjenta - user sam wybierze
    localStorage.removeItem(ACTIVE_PATIENT_KEY);
}

// --- UI: badge aktywnego pacjenta ---
function updateActivePatientBadge() {
    const badge = document.getElementById('activePatientBadge');
    const label = document.getElementById('activePatientLabel');
    if (!badge || !label) return;
    const id = localStorage.getItem(ACTIVE_PATIENT_KEY);
    if (!id) {
        badge.style.display = 'none';
        return;
    }
    const patient = getPatientsIndex().find(p => p.id === id);
    if (!patient) {
        badge.style.display = 'none';
        localStorage.removeItem(ACTIVE_PATIENT_KEY);
        return;
    }
    label.textContent = `${patient.name}${patient.historyNumber ? ' · ' + patient.historyNumber : ''}`;
    badge.style.display = 'inline-flex';
    badge.onclick = function(e) {
        if (e.target.closest('.active-patient-clear')) return;
        openPatientsModal(id);
    };
    renderRecentPatients();
}

// Pasek "Ostatni pacjenci" w gornej czesci - szybki dostep, 1 klik wczytuje
// najnowsza karte pacjenta. Pokazuje do 6 ostatnio zapisanych.
function renderRecentPatients() {
    const bar = document.getElementById('recentPatientsBar');
    const chips = document.getElementById('recentPatientsChips');
    if (!bar || !chips) return;
    const patients = getPatientsIndex().slice()
        .sort((a, b) => new Date(b.lastSavedAt || 0) - new Date(a.lastSavedAt || 0))
        .slice(0, 6);
    if (patients.length === 0) { bar.style.display = 'none'; return; }
    const activeId = localStorage.getItem(ACTIVE_PATIENT_KEY);
    chips.innerHTML = patients.map(p => {
        const active = p.id === activeId ? ' active' : '';
        const label = escapeHtml(p.name) + (p.historyNumber ? ` · ${escapeHtml(p.historyNumber)}` : '');
        return `<button type="button" class="recent-patient-chip${active}" onclick="selectAndUseLatestCard('${escapeAttr(p.id)}')" title="Wczytaj najnowszą kartę: ${escapeAttr(p.name)}"><i class="fas fa-user"></i> ${label}</button>`;
    }).join('');
    bar.style.display = '';
}

function clearActivePatient(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    localStorage.removeItem(ACTIVE_PATIENT_KEY);
    updateActivePatientBadge();
    renderRecentPatients();
    showToast('Pacjent', 'Odznaczono aktywnego pacjenta', 'info', 2000);
}

// --- Modal pacjentów ---
let _currentHistoryPatientId = null;

function openPatientsModal(focusPatientId) {
    const modal = document.getElementById('patientsModal');
    if (!modal) return;
    if (focusPatientId) {
        showPatientHistoryView(focusPatientId);
    } else {
        showPatientsListView();
    }
    modal.style.display = 'flex';
}

function showPatientsListView() {
    document.getElementById('patientsListView').style.display = '';
    document.getElementById('patientHistoryView').style.display = 'none';
    document.getElementById('patientsModalTitle').innerHTML = '<i class="fas fa-user-injured"></i> Pacjenci';
    _currentHistoryPatientId = null;
    renderPatientsList();
}

function renderPatientsList() {
    const listEl = document.getElementById('patientsList');
    const emptyEl = document.getElementById('patientsEmpty');
    const search = (document.getElementById('patientsSearchInput')?.value || '').toLowerCase().trim();
    const patients = getPatientsIndex().slice();

    // Dołącz liczbę kart i posortuj po lastSavedAt malejąco
    patients.forEach(p => {
        p._historyCount = getPatientHistory(p.id).length;
    });
    patients.sort((a, b) => new Date(b.lastSavedAt || 0) - new Date(a.lastSavedAt || 0));

    const filtered = search
        ? patients.filter(p =>
            (p.name || '').toLowerCase().includes(search) ||
            (p.historyNumber || '').toLowerCase().includes(search) ||
            (p.lastDiagnosis || '').toLowerCase().includes(search))
        : patients;

    listEl.innerHTML = '';
    if (filtered.length === 0) {
        emptyEl.style.display = '';
        if (search) {
            emptyEl.querySelector('div').textContent = 'Brak pacjentów pasujących do wyszukiwania';
        }
        return;
    }
    emptyEl.style.display = 'none';

    const activeId = localStorage.getItem(ACTIVE_PATIENT_KEY);

    filtered.forEach(p => {
        const li = document.createElement('li');
        const isActive = p.id === activeId;
        const lastSaved = p.lastSavedAt ? getTimeAgo(new Date(p.lastSavedAt)) : '—';
        li.innerHTML = `
            <div class="patient-row-main" onclick="selectAndUseLatestCard('${escapeAttr(p.id)}')" title="Kliknij, aby wczytać najnowszą kartę tego pacjenta" style="cursor:pointer;">
                <div class="patient-name">
                    ${isActive ? '<i class="fas fa-circle" style="color:#10b981;font-size:8px;" title="Aktywny pacjent"></i>' : ''}
                    ${escapeHtml(p.name)}
                    ${p.historyNumber ? `<span class="patient-history-num">${escapeHtml(p.historyNumber)}</span>` : ''}
                </div>
                <div class="patient-meta">
                    <span class="meta-chip"><i class="fas fa-clipboard-list"></i> ${p._historyCount} ${p._historyCount === 1 ? 'karta' : (p._historyCount >= 2 && p._historyCount <= 4 ? 'karty' : 'kart')}</span>
                    ${p.lastDiagnosis ? `<span class="meta-chip"><i class="fas fa-notes-medical"></i> ${escapeHtml(p.lastDiagnosis)}</span>` : ''}
                    <span class="meta-chip"><i class="fas fa-clock"></i> ${lastSaved}</span>
                </div>
            </div>
            <div class="patient-row-actions">
                <button class="control-button save small" onclick="event.stopPropagation(); selectAndUseLatestCard('${escapeAttr(p.id)}')" title="Wczytaj najnowszą kartę tego pacjenta">
                    <i class="fas fa-folder-open"></i> Wczytaj
                </button>
                <button class="control-button load small" onclick="event.stopPropagation(); showPatientHistoryView('${escapeAttr(p.id)}')" title="Pokaż historię kart (dzień po dniu)">
                    <i class="fas fa-clock-rotate-left"></i> Historia
                </button>
            </div>`;
        listEl.appendChild(li);
    });
}

function showPatientHistoryView(patientId) {
    const patient = getPatientsIndex().find(p => p.id === patientId);
    if (!patient) {
        showToast('Błąd', 'Nie znaleziono pacjenta', 'error');
        return;
    }
    _currentHistoryPatientId = patientId;
    document.getElementById('patientsListView').style.display = 'none';
    document.getElementById('patientHistoryView').style.display = '';
    document.getElementById('patientsModalTitle').innerHTML =
        `<i class="fas fa-user"></i> ${escapeHtml(patient.name)}`;

    const headerEl = document.getElementById('patientHistoryHeader');
    headerEl.innerHTML = `
        <div class="ph-name">${escapeHtml(patient.name)}</div>
        <div class="ph-meta">
            ${patient.historyNumber ? `<span><i class="fas fa-hashtag"></i> Nr historii: <strong>${escapeHtml(patient.historyNumber)}</strong></span>` : ''}
            ${patient.pesel ? `<span><i class="fas fa-id-card"></i> PESEL: ${escapeHtml(patient.pesel)}</span>` : ''}
            ${patient.admissionDate ? `<span><i class="fas fa-calendar-plus"></i> Przyjęcie: ${escapeHtml(patient.admissionDate)}</span>` : ''}
            ${patient.lastDiagnosis ? `<span><i class="fas fa-notes-medical"></i> ${escapeHtml(patient.lastDiagnosis)}</span>` : ''}
            ${patient.allergies ? `<span style="color:var(--danger);"><i class="fas fa-triangle-exclamation"></i> ${escapeHtml(patient.allergies)}</span>` : ''}
        </div>`;

    renderPatientHistory(patientId);

    // ustaw aktywnego pacjenta
    localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
    updateActivePatientBadge();
}

function renderPatientHistory(patientId) {
    const listEl = document.getElementById('patientHistoryList');
    const emptyEl = document.getElementById('patientHistoryEmpty');
    const history = getPatientHistory(patientId).slice();
    // Sort: najnowsze najpierw
    history.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    listEl.innerHTML = '';
    if (history.length === 0) {
        emptyEl.style.display = '';
        return;
    }
    emptyEl.style.display = 'none';

    history.forEach((h, idx) => {
        const li = document.createElement('li');
        const dateLabel = h.cardDate || (h.savedAt ? new Date(h.savedAt).toLocaleDateString('pl-PL') : 'brak daty');
        const savedAgo = h.savedAt ? getTimeAgo(new Date(h.savedAt)) : '';
        const isLatest = idx === 0;
        li.className = isLatest ? 'history-entry-current' : '';
        li.innerHTML = `
            <div class="patient-row-main" onclick="loadSnapshotByKey('${escapeAttr(h.snapKey)}')">
                <div class="history-entry-date">
                    <i class="fas fa-calendar-day"></i> ${escapeHtml(dateLabel)}
                    ${isLatest ? '<span style="font-size:10px;color:var(--primary);margin-left:8px;">(najnowsza)</span>' : ''}
                </div>
                <div class="history-entry-meta">
                    ${h.icuDay !== '' && h.icuDay != null ? `<span class="meta-chip"><i class="fas fa-bed-pulse"></i> Doba OIT: ${escapeHtml(String(h.icuDay))}</span>` : ''}
                    ${h.diagnosis ? `<span class="meta-chip"><i class="fas fa-notes-medical"></i> ${escapeHtml(h.diagnosis)}</span>` : ''}
                    <span class="meta-chip"><i class="fas fa-clock"></i> Zapis: ${savedAgo}</span>
                </div>
            </div>
            <div class="patient-row-actions">
                <button class="control-button load small" onclick="loadSnapshotByKey('${escapeAttr(h.snapKey)}')">
                    <i class="fas fa-folder-open"></i> Wczytaj
                </button>
                <button class="control-button clear small" onclick="deleteSnapshot('${escapeAttr(patientId)}', '${escapeAttr(h.snapKey)}')" title="Usuń tę kartę z historii">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
        listEl.appendChild(li);
    });
}

function loadSnapshotByKey(snapKey) {
    const json = localStorage.getItem(snapKey);
    if (!json) {
        showToast('Błąd', 'Snapshot nie istnieje', 'error');
        return;
    }
    try {
        const state = JSON.parse(json);
        populateCardFromState(state);
        closeModal('patientsModal');
        const ps = state.metadata?.patientSummary;
        showToast('Wczytano', `Karta z ${state.header?.mainDateInput || ''} dla ${ps?.name || 'pacjenta'}`, 'success');
    } catch (e) {
        console.error(e);
        showToast('Błąd', 'Nie udało się wczytać karty', 'error');
    }
}

function deleteSnapshot(patientId, snapKey) {
    if (!confirm('Usunąć tę kartę z historii pacjenta?')) return;
    localStorage.removeItem(snapKey);
    const history = getPatientHistory(patientId).filter(h => h.snapKey !== snapKey);
    savePatientHistory(patientId, history);
    renderPatientHistory(patientId);
    showToast('Usunięto', 'Karta usunięta z historii', 'info');
}

function selectAndUseLatestCard(patientId) {
    const history = getPatientHistory(patientId).slice()
        .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    if (history.length === 0) {
        // Nie ma snapshotu - pre-fill danych pacjenta
        localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
        createNewCardForActivePatient();
        return;
    }
    localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
    updateActivePatientBadge();
    loadSnapshotByKey(history[0].snapKey);
}

function createNewCardForActivePatient() {
    const id = _currentHistoryPatientId || localStorage.getItem(ACTIVE_PATIENT_KEY);
    if (!id) {
        showToast('Brak pacjenta', 'Najpierw wybierz pacjenta z listy', 'warning');
        return;
    }
    const patient = getPatientsIndex().find(p => p.id === id);
    if (!patient) {
        showToast('Błąd', 'Nie znaleziono pacjenta', 'error');
        return;
    }
    // Wyczyść kartę bez potwierdzenia
    clearCard(true);
    // Pre-fill danych pacjenta
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el && val) el.value = val;
    };
    setVal('patientNameInput', patient.name);
    setVal('historyNumberInput', patient.historyNumber);
    setVal('peselInput', patient.pesel);
    setVal('admissionDateInput', patient.admissionDate);
    setVal('allergiesInput', patient.allergies);
    if (patient.lastDiagnosis) setVal('diagnosisInput', patient.lastDiagnosis);

    if (typeof calculateIcuDay === 'function') calculateIcuDay();
    if (typeof applyNewDrugMarkers === 'function') applyNewDrugMarkers();

    localStorage.setItem(ACTIVE_PATIENT_KEY, id);
    updateActivePatientBadge();
    closeModal('patientsModal');
    showToast('Nowa karta', `Pre-wypełniono dane: ${patient.name}`, 'success');
}

function deleteActivePatient() {
    const id = _currentHistoryPatientId;
    if (!id) return;
    const patient = getPatientsIndex().find(p => p.id === id);
    if (!patient) return;
    if (!confirm(`Usunąć pacjenta "${patient.name}" wraz z całą historią kart? Tej operacji nie można cofnąć.`)) return;

    // Usuń wszystkie snapshoty
    getPatientHistory(id).forEach(h => {
        if (h.snapKey) localStorage.removeItem(h.snapKey);
    });
    localStorage.removeItem(`patientHistory_${id}`);

    // Usuń z indeksu
    const list = getPatientsIndex().filter(p => p.id !== id);
    savePatientsIndex(list);

    if (localStorage.getItem(ACTIVE_PATIENT_KEY) === id) {
        localStorage.removeItem(ACTIVE_PATIENT_KEY);
    }
    updateActivePatientBadge();
    showToast('Usunięto', `Pacjent "${patient.name}" usunięty z kartoteki`, 'info');
    showPatientsListView();
}

function createPatientFromCurrent() {
    const name = document.getElementById('patientNameInput').value.trim();
    const historyNumber = document.getElementById('historyNumberInput').value.trim();
    if (!name || !historyNumber) {
        showToast('Brak danych', 'Wypełnij imię, nazwisko i numer historii w bieżącej karcie', 'warning');
        return;
    }
    const id = getPatientId(name, historyNumber);
    const list = getPatientsIndex();
    if (list.find(p => p.id === id)) {
        showToast('Już istnieje', 'Pacjent znajduje się już w kartotece', 'info');
        showPatientHistoryView(id);
        return;
    }
    // Dodaj bez snapshotu - tylko podstawowe dane
    const now = new Date().toISOString();
    list.push({
        id, name, historyNumber,
        pesel: document.getElementById('peselInput').value.trim(),
        admissionDate: document.getElementById('admissionDateInput').value.trim(),
        allergies: document.getElementById('allergiesInput').value.trim(),
        lastDiagnosis: document.getElementById('diagnosisInput').value.trim(),
        createdAt: now,
        lastSavedAt: now
    });
    savePatientsIndex(list);
    localStorage.setItem(ACTIVE_PATIENT_KEY, id);
    updateActivePatientBadge();
    renderPatientsList();
    showToast('Dodano', `Pacjent "${name}" dodany do kartoteki. Zapisz kartę, aby utworzyć pierwszy wpis w historii.`, 'success');
}

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
function escapeAttr(str) {
    return escapeHtml(str).replace(/`/g, '&#96;');
}
