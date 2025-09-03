// Ta funkcja pomocnicza tworzy przycisk usuwania dla każdego wiersza
function createRemoveButton(row) {
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.onclick = function() {
        row.remove();
        // Po usunięciu wiersza przelicz sumy (jeśli istnieją)
        if (typeof calculateTotals === 'function') {
            calculateTotals();
        }
    };
    return removeButton;
}

function addContinuousDrug() {
    const tbody = document.getElementById('continuousDrugsTbody');
    const newRow = tbody.insertRow();

    // Komórka 1: Lek / Stężenie
    const cell1 = newRow.insertCell();
    cell1.dataset.label = 'Lek / Stężenie';
    cell1.innerHTML = '<input type="text" class="drug-input" placeholder="np. Noradrenalina 8mg/50ml">';

    // Komórka 2: Dawka
    const cell2 = newRow.insertCell();
    cell2.dataset.label = 'Dawka';
    cell2.innerHTML = '<input type="text" class="drug-input" placeholder="np. 0.1 mcg/kg/min">';

    // Komórka 3: Prędkość
    const cell3 = newRow.insertCell();
    cell3.dataset.label = 'Prędkość [ml/h]';
    cell3.innerHTML = '<input type="number" class="drug-input" placeholder="ml/h">';

    // Komórka 4: Podpis pielęgniarki
    const cell4 = newRow.insertCell();
    cell4.dataset.label = 'Podpis pielęgniarki';
    cell4.innerHTML = ''; // Puste miejsce na podpis

    // Komórka 5: Akcja (przycisk usuwania)
    const cell5 = newRow.insertCell();
    cell5.className = 'action-column no-print';
    cell5.appendChild(createRemoveButton(newRow));
}

function addPeriodicDrug() {
    const tbody = document.getElementById('periodicDrugsTbody');
    const newRow = tbody.insertRow();

    // Komórka 1: Lek / Dawka
    const cell1 = newRow.insertCell();
    cell1.dataset.label = 'Lek / Dawka';
    cell1.innerHTML = '<input type="text" class="drug-input" placeholder="np. Paracetamol 1g">';

    // Komórka 2: Droga / Częstość
    const cell2 = newRow.insertCell();
    cell2.dataset.label = 'Droga / Częstość';
    cell2.innerHTML = '<input type="text" class="drug-input" placeholder="i.v. co 6h">';

    // Komórka 3: Podpis pielęgniarki
    const cell3 = newRow.insertCell();
    cell3.dataset.label = 'Podpis pielęgniarki';
    cell3.innerHTML = ''; // Puste miejsce na podpis

    // Komórka 4: Akcja
    const cell4 = newRow.insertCell();
    cell4.className = 'action-column no-print';
    cell4.appendChild(createRemoveButton(newRow));
}

function addFluid() {
    const tbody = document.getElementById('fluidsTbody');
    const newRow = tbody.insertRow();

    // Komórka 1: Płyn
    const cell1 = newRow.insertCell();
    cell1.dataset.label = 'Płyn';
    cell1.innerHTML = '<input type="text" class="drug-input" placeholder="np. Optilyte">';

    // Komórka 2: Dodatki
    const cell2 = newRow.insertCell();
    cell2.dataset.label = 'Dodatki';
    cell2.innerHTML = '<input type="text" class="drug-input" placeholder="np. KCL 20mEq">';
    
    // Komórka 3: Objętość
    const cell3 = newRow.insertCell();
    cell3.dataset.label = 'Objętość [ml]';
    cell3.innerHTML = '<input type="number" class="drug-input" placeholder="500">';

    // Komórka 4: Prędkość
    const cell4 = newRow.insertCell();
    cell4.dataset.label = 'Prędkość [ml/h]';
    cell4.innerHTML = '<input type="number" class="drug-input" placeholder="80">';
    
    // Komórka 5: Podpis
    const cell5 = newRow.insertCell();
    cell5.dataset.label = 'Podpis pielęgniarki';
    cell5.innerHTML = '';

    // Komórka 6: Akcja
    const cell6 = newRow.insertCell();
    cell6.className = 'action-column no-print';
    cell6.appendChild(createRemoveButton(newRow));
}

function addNutrition() {
    const tbody = document.getElementById('nutritionTbody');
    const newRow = tbody.insertRow();
    
    // Komórka 1: Typ żywienia
    const cell1 = newRow.insertCell();
    cell1.dataset.label = 'Typ żywienia';
    cell1.innerHTML = '<input type="text" list="nutritionTypesList" class="drug-input" placeholder="Dojelitowe / Pozajelitowe">';

    // Komórka 2: Preparat / Dawka
    const cell2 = newRow.insertCell();
    cell2.dataset.label = 'Preparat / Dawka';
    cell2.innerHTML = '<input type="text" class="drug-input" placeholder="np. Nutrison 1500 kcal">';
    
    // Komórka 3: Prędkość
    const cell3 = newRow.insertCell();
    cell3.dataset.label = 'Prędkość [ml/h]';
    cell3.innerHTML = '<input type="number" class="drug-input" placeholder="60">';

    // Komórka 4: Podpis
    const cell4 = newRow.insertCell();
    cell4.dataset.label = 'Podpis pielęgniarki';
    cell4.innerHTML = '';
    
    // Komórka 5: Akcja
    const cell5 = newRow.insertCell();
    cell5.className = 'action-column no-print';
    cell5.appendChild(createRemoveButton(newRow));
}

function addProcedure() {
    const tbody = document.getElementById('proceduresTbody');
    const newRow = tbody.insertRow();

    // Komórka 1: Godzina
    const cell1 = newRow.insertCell();
    cell1.dataset.label = 'Godzina';
    cell1.innerHTML = '<input type="text" list="timesList" class="drug-input" placeholder="np. 08:00">';

    // Komórka 2: Procedura
    const cell2 = newRow.insertCell();
    cell2.dataset.label = 'Procedura';
    cell2.innerHTML = '<input type="text" list="proceduresList" class="drug-input" placeholder="np. RTG klatki piersiowej">';
    
    // Komórka 3: Wykonano
    const cell3 = newRow.insertCell();
    cell3.dataset.label = 'Wykonano (podpis)';
    cell3.innerHTML = '';
    
    // Komórka 4: Akcja
    const cell4 = newRow.insertCell();
    cell4.className = 'action-column no-print';
    cell4.appendChild(createRemoveButton(newRow));
}


// --- POZOSTAŁE FUNKCJE (PRZYKŁADOWE) ---

// Przełącznik Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    // Zapisz preferencję w localStorage
    if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Sprawdź preferencje Dark Mode przy ładowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark-mode');
    }
    // Możesz tutaj dodać domyślne wiersze, jeśli chcesz
    // addContinuousDrug();
    // addPeriodicDrug();
});

// Wyczyść kartę
function clearCard() {
    if (confirm('Czy na pewno chcesz wyczyścić całą kartę? Tej operacji nie można cofnąć.')) {
        // Wyczyszczenie wszystkich inputów w nagłówku i stopce
        const inputs = document.querySelectorAll('.header-input, .notes-section textarea');
        inputs.forEach(input => input.value = '');

        // Usunięcie wszystkich dynamicznie dodanych wierszy z tabel
        const tbodies = document.querySelectorAll('tbody');
        tbodies.forEach(tbody => tbody.innerHTML = '');
        
        // Zresetowanie podsumowań
        const totalFluids = document.getElementById('totalFluids');
        const totalKcal = document.getElementById('totalKcal');
        if(totalFluids) totalFluids.textContent = '0';
        if(totalKcal) totalKcal.textContent = '0';
    }
}

// Funkcje dla modali (okien dialogowych)
function openLoadModal() {
    const modal = document.getElementById('loadCardModal');
    if (modal) modal.style.display = 'flex';
    // Tutaj powinna być logika wczytywania zapisanych kart
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// TODO: Zaimplementuj resztę funkcji (generatePDF, saveCard, etc.)
// Poniżej znajdują się puste definicje, aby uniknąć błędów w konsoli.
function generatePDF() { alert('Funkcja generatePDF() nie została jeszcze zaimplementowana.'); }
function saveCard() { alert('Funkcja saveCard() nie została jeszcze zaimplementowana.'); }
function saveCardToFile() { alert('Funkcja saveCardToFile() nie została jeszcze zaimplementowana.'); }
function loadCardFromFile(event) { alert('Funkcja loadCardFromFile() nie została jeszcze zaimplementowana.'); }
function calculateIcuDay() { console.log('calculateIcuDay triggered'); }
function handleWeightHeightChange() { console.log('handleWeightHeightChange triggered'); }
function adjustAllDosesForGfr() { console.log('adjustAllDosesForGfr triggered'); }
function saveAdditives() { closeModal('additivesModal'); }
function addAdditiveRowToModal() { console.log('addAdditiveRowToModal triggered'); }
