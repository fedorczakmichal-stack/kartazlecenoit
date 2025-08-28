// --- BAZY DANYCH I KONFIGURACJA ---
const continuousDrugsData = { 'NORADRENALINA': { concentration: '8mg/50ml', dose: '0.1-0.5 μg/kg/min' }, 'ADRENALINA': { concentration: '1mg/50ml', dose: '0.01-0.1 μg/kg/min' }, 'DOPAMINA': { concentration: '200mg/50ml', dose: '2-20 μg/kg/min' }, 'DOBUTAMINA': { concentration: '250mg/50ml', dose: '2-20 μg/kg/min' }, 'WAZOPRESYNA': { concentration: '20j/20ml', dose: '0.01-0.04 j/min' }, 'MILRINON': { concentration: '10mg/50ml', dose: '0.375-0.75 μg/kg/min' }, 'PROPOFOL 1%': { concentration: '10mg/ml', dose: '1-3 mg/kg/h' }, 'PROPOFOL 2%': { concentration: '20mg/ml', dose: '1-3 mg/kg/h' }, 'MIDAZOLAM': { concentration: '50mg/50ml', dose: '0.5-5 mg/h' }, 'DEKSMEDETOMIDYNA': { concentration: '200μg/50ml', dose: '0.2-0.7 μg/kg/h' }, 'FENTANYL': { concentration: '500μg/10ml', dose: '1-2 μg/kg/h' }, 'REMIFENTANYL': { concentration: '2mg/40ml', dose: '0.05-0.2 μg/kg/min' }, 'MORFINA': { concentration: '10mg/10ml', dose: '1-10 mg/h' }, 'KETAMINA': { concentration: '500mg/10ml', dose: '0.5-2 mg/kg/h' }, 'ROKURONIOM': { concentration: '50mg/5ml', dose: '0.3-0.6 mg/kg/h' }, 'CISATRAKURIUM': { concentration: '20mg/10ml', dose: '0.06-0.18 mg/kg/h' }, 'INSULINA': { concentration: '50j/50ml', dose: '0.5-10 j/h' }, 'HEPARYNA': { concentration: '25000j/50ml', dose: '500-2000 j/h' }, 'FUROSEMID': { concentration: '100mg/10ml', dose: '5-20 mg/h' }, 'AMIODARON': { concentration: '450mg/50ml', dose: '0.5-1 mg/min' }, 'NITROGLICERYNA': { concentration: '10mg/50ml', dose: '5-200 μg/min' }, 'NITROPRUSYDEK SODU': { concentration: '50mg/50ml', dose: '0.3-10 μg/kg/min' }, 'LABETALOL': { concentration: '100mg/20ml', dose: '0.5-2 mg/min' }, 'URAPIDIL': { concentration: '250mg/50ml', dose: '5-40 mg/h' } };
const periodicDrugsData = { 'MEROPENEM': { dose: '1g', route: 'i.v. (30min)', frequency: 'q8h' }, 'PIPERACYLINA/TAZOBAKTAM': { dose: '4.5g', route: 'i.v. (30min)', frequency: 'q8h' }, 'WANKOMYCYNA': { dose: '1g', route: 'i.v. (2h)', frequency: 'q12h' }, 'LINEZOLID': { dose: '600mg', route: 'i.v. (2h)', frequency: 'q12h' }, 'CEFTRIAKSON': { dose: '2g', route: 'i.v.', frequency: 'q24h' }, 'CEFTAZYDYM': { dose: '2g', route: 'i.v.', frequency: 'q8h' }, 'CIPROFLOKSACYNA': { dose: '400mg', route: 'i.v. (1h)', frequency: 'q12h' }, 'METRONIDAZOL': { dose: '500mg', route: 'i.v.', frequency: 'q8h' }, 'FLUKONAZOL': { dose: '400mg', route: 'i.v.', frequency: 'q24h' }, 'KASPOFUNGINA': { dose: '50mg', route: 'i.v.', frequency: 'q24h' }, 'PANTOPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'q24h' }, 'OMEPRAZOL': { dose: '40mg', route: 'i.v.', frequency: 'q24h' }, 'RANITYDYNA': { dose: '50mg', route: 'i.v.', frequency: 'q8h' }, 'ENOKSAPARYNA': { dose: '40mg', route: 's.c.', frequency: 'q24h' }, 'DALTEPARYNA': { dose: '5000j', route: 's.c.', frequency: 'q24h' }, 'NADROPARYNA': { dose: '0.3ml', route: 's.c.', frequency: 'q24h' }, 'FUROSEMID': { dose: '20mg', route: 'i.v.', frequency: 'PRN' }, 'TORASEMID': { dose: '10mg', route: 'i.v.', frequency: 'q24h' }, 'MANNITOL': { dose: '0.5g/kg', route: 'i.v. (30min)', frequency: 'q6h' }, 'HYDROKORTYZON': { dose: '100mg', route: 'i.v.', frequency: 'q8h' }, 'METYLOPREDNIZOLON': { dose: '40mg', route: 'i.v.', frequency: 'q12h' }, 'DEKSAMETAZON': { dose: '8mg', route: 'i.v.', frequency: 'q24h' }, 'PARACETAMOL': { dose: '1g', route: 'i.v.', frequency: 'q6h' }, 'METAMIZOL': { dose: '1g', route: 'i.v.', frequency: 'q6h' }, 'HALOPERIDOL': { dose: '5mg', route: 'i.v.', frequency: 'PRN' }, 'METOKLOPRAMID': { dose: '10mg', route: 'i.v.', frequency: 'q8h' }, 'ONDANSETRON': { dose: '4mg', route: 'i.v.', frequency: 'q8h' }, 'N-ACETYLOCYSTEINA': { dose: '600mg', route: 'i.v.', frequency: 'q12h' }, 'WITAMINA K': { dose: '10mg', route: 'i.v.', frequency: 'q24h' }, 'WITAMINA C': { dose: '1g', route: 'i.v.', frequency: 'q24h' }, 'TIAMINA': { dose: '100mg', route: 'i.v.', frequency: 'q24h' }, 'MAGNEZ': { dose: '2g', route: 'i.v. (30min)', frequency: 'q24h' }, 'POTAS': { dose: '20mmol', route: 'i.v. (2h)', frequency: 'q12h' }, 'WAPŃ': { dose: '10ml', route: 'i.v.', frequency: 'q24h' }, 'FOSFORANY': { dose: '10mmol', route: 'i.v. (4h)', frequency: 'q24h' } };
const fluidsData = { 'NaCl 0.9%': { volume: '500ml', rate: '50' }, 'Plasmalyte': { volume: '500ml', rate: '30' }, 'Ringer': { volume: '500ml', rate: '50' }, 'Glukoza 5%': { volume: '500ml', rate: '40' }, 'Glukoza 10%': { volume: '500ml', rate: '30' }, 'Gelafundin 4%': { volume: '500ml', rate: '100' }, 'Voluven 6%': { volume: '500ml', rate: '100' }, 'Albuminy 20%': { volume: '100ml', rate: '50' }, 'Albuminy 5%': { volume: '250ml', rate: '50' }, 'Mannitol 15%': { volume: '250ml', rate: '125' }, 'NaHCO3 8.4%': { volume: '100ml', rate: '50' } };
const glucoseKcalData = { "Glukoza 5%": 0.17, "Glukoza 10%": 0.34 };
const nutritionData = { "Nutrison 500ml": { kcal: 515, volume: 500 }, "Nutrison 1000ml": { kcal: 1030, volume: 1000 }, "Nutrison Energy 500ml": { kcal: 765, volume: 500 }, "Nutrison Energy 1000ml": { kcal: 1530, volume: 1000 }, "Nutrison Protein Plus 500ml": { kcal: 630, volume: 500 }, "Nutrison Protein Plus 1000ml": { kcal: 1260, volume: 1000 }, "Fresubin HP Energy 500ml": { kcal: 750, volume: 500 }, "Fresubin HP Energy 1000ml": { kcal: 1500, volume: 1000 }, "Fresubin Original 500ml": { kcal: 500, volume: 500 }, "Peptamen 500ml": { kcal: 500, volume: 500 }, "Diben 500ml": { kcal: 515, volume: 500 }, "SmofKabiven 986ml": { kcal: 1100, volume: 986 }, "SmofKabiven 1477ml": { kcal: 1600, volume: 1477 }, "SmofKabiven 1970ml": { kcal: 2200, volume: 1970 }, "SmofKabiven 2463ml": { kcal: 2700, volume: 2463 }, "Kabiven 1026ml": { kcal: 1100, volume: 1026 }, "Kabiven 1540ml": { kcal: 1700, volume: 1540 }, "Kabiven 2053ml": { kcal: 2200, volume: 2053 }, "Olimel N9E 1000ml": { kcal: 1200, volume: 1000 }, "Olimel N9E 1500ml": { kcal: 1800, volume: 1500 }, "Olimel N9E 2000ml": { kcal: 2400, volume: 2000 }, };

// --- GŁÓWNE FUNKCJE ---

function removeRow(button) { button.closest('tr').remove(); updateSummaries(); }

function updateSummaries() {
    let totalFluids = 0;
    let totalKcal = 0;
    document.querySelectorAll('#fluidsTable tbody tr').forEach(row => {
        const rateInput = row.querySelector('input[id$="_rate"]');
        const nameInput = row.querySelector('input[id$="_name"]');
        if (rateInput && rateInput.value) {
            const rate = parseFloat(rateInput.value.replace(',', '.'));
            if (!isNaN(rate)) {
                const volume24h = rate * 24;
                totalFluids += volume24h;
                if (nameInput && glucoseKcalData[nameInput.value]) {
                    totalKcal += volume24h * glucoseKcalData[nameInput.value];
                }
            }
        }
    });
    document.querySelectorAll('#nutritionTable tbody tr').forEach(row => {
        const prepInput = row.querySelector('.nutrition-prep');
        if (prepInput && prepInput.value) {
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

function calculateInfusionRate(inputElement) {
    const row = inputElement.closest('tr');
    if (!row) return;
    const weightInput = document.getElementById('patientWeight');
    const weight = parseFloat(weightInput.value);
    const doseInput = row.querySelector('.dose');
    const concentrationInput = row.querySelector('input[id$="_conc"]');
    const rateOutput = row.querySelector('.infusion-rate');
    if (!weight || weight <= 0 || !doseInput.value || !concentrationInput.value) {
        rateOutput.value = '';
        return;
    }
    let doseStr = doseInput.value.replace(',', '.');
    let concStr = concentrationInput.value.replace(',', '.');
    const doseRegex = /([\d\.]+)(?:\s*-\s*([\d\.]+))?.*?(μg|mcg|mg|j)\s*(\/kg)?\s*\/(min|h)/;
    const doseMatch = doseStr.match(doseRegex);
    if (!doseMatch) { rateOutput.value = 'Błąd dawki'; return; }
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
    } else { rateOutput.value = 'Błąd stęż.'; return; }
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
        rateOutput.value = `${finalRate1.toFixed(2).replace('.', ',')} - ${finalRate2.toFixed(2).replace('.', ',')}`;
    } else {
        rateOutput.value = finalRate1.toFixed(2).replace('.', ',');
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

// --- FUNKCJE DODAWANIA WIERSZY ---
function addContinuousDrug() { const tbody = document.querySelector('#continuousDrugsTable tbody'); const newRow = document.createElement('tr'); const rowId = 'cont_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Nazwa" list="continuousDrugsList" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input" placeholder="Stężenie" id="${rowId}_conc" oninput="calculateInfusionRate(this)" /></td><td><input type="text" class="drug-input dose" placeholder="Dawka" id="${rowId}_dose" oninput="calculateInfusionRate(this)" /></td><td><div class="rate-container"><input type="text" class="infusion-rate" placeholder="0,00" readonly /><span>ml/h</span></div></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; tbody.appendChild(newRow); }
function fillContinuousDrugData(input, rowId) { const drugName = input.value.toUpperCase(); if (continuousDrugsData[drugName]) { const data = continuousDrugsData[drugName]; const concInput = document.getElementById(rowId + '_conc'); const doseInput = document.getElementById(rowId + '_dose'); concInput.value = data.concentration; doseInput.value = data.dose; calculateInfusionRate(doseInput); } }
function addPeriodicDrug() { const tbody = document.querySelector('#periodicDrugsTable tbody'); const newRow = document.createElement('tr'); const rowId = 'per_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Nazwa" list="periodicDrugsList" onchange="fillPeriodicDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input dose" placeholder="Dawka" id="${rowId}_dose" /></td><td><input type="text" class="drug-input" value="i.v." id="${rowId}_route" /><input type="text" class="drug-input" placeholder="q24h" id="${rowId}_freq" style="font-weight: bold;" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; tbody.appendChild(newRow); }
function fillPeriodicDrugData(input, rowId) { const drugName = input.value.toUpperCase(); if (periodicDrugsData[drugName]) { const data = periodicDrugsData[drugName]; document.getElementById(rowId + '_dose').value = data.dose; document.getElementById(rowId + '_route').value = data.route; document.getElementById(rowId + '_freq').value = data.frequency; } }
function addFluid() { const tbody = document.querySelector('#fluidsTable tbody'); const newRow = document.createElement('tr'); const rowId = 'fluid_' + Date.now(); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Płyn" list="fluidsList" onchange="fillFluidData(this, '${rowId}')" id="${rowId}_name" style="color: #00a2e8;" oninput="updateSummaries()"/></td><td><input type="text" class="drug-input" placeholder="ml" id="${rowId}_vol" /></td><td><input type="text" class="drug-input" placeholder="ml/h" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; tbody.appendChild(newRow); updateSummaries(); }
function fillFluidData(input, rowId) { const fluidName = input.value; if (fluidsData[fluidName]) { const data = fluidsData[fluidName]; document.getElementById(rowId + '_vol').value = data.volume; document.getElementById(rowId + '_rate').value = data.rate; updateSummaries(); } }
function updateNutritionProductList(typeInput) { const row = typeInput.closest('tr'); const prepInput = row.querySelector('.nutrition-prep'); const typeValue = typeInput.value.toLowerCase(); if (typeValue.includes('dojelitowe')) { prepInput.setAttribute('list', 'enteralProductsList'); } else if (typeValue.includes('parenteralne')) { prepInput.setAttribute('list', 'parenteralProductsList'); } else { prepInput.removeAttribute('list'); } prepInput.value = ''; prepInput.focus(); updateSummaries(); }
function addNutrition() { const tbody = document.querySelector('#nutritionTable tbody'); const newRow = document.createElement('tr'); newRow.innerHTML = `<td><input type="text" class="drug-input drug-name" placeholder="Wybierz typ..." list="nutritionTypesList" style="color: #ff7f27;" onchange="updateNutritionProductList(this)" /></td><td><input type="text" class="drug-input nutrition-prep" placeholder="Wybierz preparat..." oninput="updateSummaries()"/></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; tbody.appendChild(newRow); }
function addProcedure() { const tbody = document.querySelector('#proceduresTable tbody'); const newRow = document.createElement('tr'); newRow.innerHTML = `<td><input type="text" class="drug-input" placeholder="Godz." list="timesList" style="width: 60px;" /></td><td><input type="text" class="drug-input" placeholder="Nazwa procedury/zabiegu" list="proceduresList" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; tbody.appendChild(newRow); }

// --- FUNKCJE STARTOWE, ZAPISU, WCZYTYWANIA, TRYBU CIEMNEGO ---

function initializeCard() {
    // Ustaw dzisiejszą datę w formacie DD.MM.RRRR
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    document.getElementById('mainDateInput').value = `${day}.${month}.${year}`;

    // Uruchom kalkulator dób
    calculateIcuDay();
}

document.addEventListener('DOMContentLoaded', () => {
    // KONFIGURACJA PRZYCISKÓW (uruchamiana tylko raz)
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    if (localStorage.getItem('darkMode') === 'enabled') {
        html.classList.add('dark-mode');
        toggle.textContent = '☀️';
    }
    toggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        if (html.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggle.textContent = '🌙';
        }
    });

    // INICJALIZACJA KARTY
    initializeCard();
});

function saveCard() { const cardData = { patientData: {}, continuousDrugs: [], periodicDrugs: [], fluids: [], nutrition: [], procedures: [], notes: '' }; document.querySelectorAll('.header-input').forEach(input => { if (input.id) cardData.patientData[input.id] = input.value; }); const safePatientName = (document.getElementById('patientNameInput').value.trim().replace(/\s+/g, '_') || 'pacjent'); const safeHistoryNumber = (document.getElementById('historyNumberInput').value.trim().replace(/\//g, '-') || 'brak_numeru_historii'); const filename = `${safePatientName}_${safeHistoryNumber}.json`; document.querySelectorAll('#continuousDrugsTable tbody tr').forEach(row => { const rowData = []; row.querySelectorAll('input').forEach(input => rowData.push(input.value)); if (rowData.length > 0) cardData.continuousDrugs.push(rowData); }); document.querySelectorAll('#periodicDrugsTable tbody tr').forEach(row => { const rowData = []; row.querySelectorAll('input').forEach(input => rowData.push(input.value)); if (rowData.length > 0) cardData.periodicDrugs.push(rowData); }); document.querySelectorAll('#fluidsTable tbody tr').forEach(row => { const rowData = []; row.querySelectorAll('input').forEach(input => rowData.push(input.value)); if (rowData.length > 0) cardData.fluids.push(rowData); }); document.querySelectorAll('#nutritionTable tbody tr').forEach(row => { const rowData = []; row.querySelectorAll('input').forEach(input => rowData.push(input.value)); if (rowData.length > 0) cardData.nutrition.push(rowData); }); document.querySelectorAll('#proceduresTable tbody tr').forEach(row => { const rowData = []; row.querySelectorAll('input').forEach(input => rowData.push(input.value)); if (rowData.length > 0) cardData.procedures.push(rowData); }); const notesTextarea = document.querySelector('textarea'); if (notesTextarea) cardData.notes = notesTextarea.value; const dataStr = JSON.stringify(cardData, null, 2); const dataBlob = new Blob([dataStr], {type: 'application/json'}); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); alert('Karta została zapisana!'); }
function loadCard() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = e => { const file = e.target.files[0]; const reader = new FileReader(); reader.onload = event => { try { const cardData = JSON.parse(event.target.result); clearCard(true); Object.keys(cardData.patientData).forEach(key => { const el = document.getElementById(key); if (el) el.value = cardData.patientData[key]; }); calculateIcuDay(); const contDrugsTbody = document.querySelector('#continuousDrugsTable tbody'); cardData.continuousDrugs.forEach(drug => { const row = document.createElement('tr'); const rowId = 'cont_' + Date.now() + Math.random(); row.innerHTML = `<td><input type="text" class="drug-input drug-name" value="${drug[0] || ''}" list="continuousDrugsList" onchange="fillContinuousDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input" value="${drug[1] || ''}" id="${rowId}_conc" oninput="calculateInfusionRate(this)" /></td><td><input type="text" class="drug-input dose" value="${drug[2] || ''}" id="${rowId}_dose" oninput="calculateInfusionRate(this)" /></td><td><div class="rate-container"><input type="text" class="infusion-rate" value="${drug[3] || ''}" readonly /><span>ml/h</span></div></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; contDrugsTbody.appendChild(row); calculateInfusionRate(row.querySelector('.dose')); }); const perDrugsTbody = document.querySelector('#periodicDrugsTable tbody'); cardData.periodicDrugs.forEach(drug => { const row = document.createElement('tr'); const rowId = 'per_' + Date.now() + Math.random(); row.innerHTML = `<td><input type="text" class="drug-input drug-name" value="${drug[0] || ''}" list="periodicDrugsList" onchange="fillPeriodicDrugData(this, '${rowId}')" id="${rowId}_name" /><input type="text" class="drug-input dose" value="${drug[1] || ''}" id="${rowId}_dose" /></td><td><input type="text" class="drug-input" value="${drug[2] || ''}" id="${rowId}_route" /><input type="text" class="drug-input" value="${drug[3] || ''}" id="${rowId}_freq" style="font-weight: bold;" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; perDrugsTbody.appendChild(row); }); const fluidsTbody = document.querySelector('#fluidsTable tbody'); cardData.fluids.forEach(fluid => { const row = document.createElement('tr'); const rowId = 'fluid_' + Date.now() + Math.random(); row.innerHTML = `<td><input type="text" class="drug-input drug-name" value="${fluid[0] || ''}" list="fluidsList" onchange="fillFluidData(this, '${rowId}')" id="${rowId}_name" style="color: #00a2e8;" oninput="updateSummaries()" /></td><td><input type="text" class="drug-input" value="${fluid[1] || ''}" id="${rowId}_vol" /></td><td><input type="text" class="drug-input" value="${fluid[2] || ''}" id="${rowId}_rate" oninput="updateSummaries()" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; fluidsTbody.appendChild(row); }); const nutritionTbody = document.querySelector('#nutritionTable tbody'); cardData.nutrition.forEach(nutr => { const row = document.createElement('tr'); const typeInputHTML = `<input type="text" class="drug-input drug-name" value="${nutr[0] || ''}" placeholder="Wybierz typ..." list="nutritionTypesList" style="color: #ff7f27;" onchange="updateNutritionProductList(this)" />`; const prepInputHTML = `<input type="text" class="drug-input nutrition-prep" value="${nutr[1] || ''}" placeholder="Wybierz preparat..." oninput="updateSummaries()"/>`; row.innerHTML = `<td>${typeInputHTML}</td><td>${prepInputHTML}</td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; nutritionTbody.appendChild(row); const typeInput = row.querySelector('.drug-name'); updateNutritionProductList(typeInput); prepInput = row.querySelector('.nutrition-prep'); prepInput.value = nutr[1] || ''; }); if (cardData.procedures) { const proceduresTbody = document.querySelector('#proceduresTable tbody'); cardData.procedures.forEach(proc => { const row = document.createElement('tr'); row.innerHTML = `<td><input type="text" class="drug-input" value="${proc[0] || ''}" list="timesList" style="width: 60px;" /></td><td><input type="text" class="drug-input" value="${proc[1] || ''}" list="proceduresList" /></td><td><div class="signature-box"></div></td><td class="action-column no-print"><button onclick="removeRow(this)" class="remove-button">Usuń</button></td>`; proceduresTbody.appendChild(row); }); } const notesTextarea = document.querySelector('textarea'); if (notesTextarea && cardData.notes) notesTextarea.value = cardData.notes; updateSummaries(); alert('Karta została wczytana!'); } catch (error) { alert('Błąd podczas wczytywania pliku!'); console.error(error); } }; reader.readAsText(file); }; input.click(); }
function clearCard(force = false) { if (force || confirm('Czy na pewno chcesz wyczyścić całą kartę?')) { document.querySelectorAll('.header-input').forEach(input => { input.value = ''; }); document.querySelectorAll('textarea').forEach(textarea => { textarea.value = ''; }); document.querySelectorAll('tbody').forEach(tbody => { tbody.innerHTML = ''; }); updateSummaries(); initializeCard(); if (!force) alert('Karta została wyczyszczona!'); } }