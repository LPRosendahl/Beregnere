
// Henter alle knapperne med class=nav-button, og henter elementet med id=content
const navButtons = document.querySelectorAll('.nav-button');
const content = document.getElementById('content');

/*
 For hver knap lyttes efter et click, ved click, gemmes den klikkede knaps værdi fra attribut:
 data-module, i variablen moduleName, og bruges som input parameter i funktionen showModule.
 */
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const moduleName = button.getAttribute('data-module');
        showModule(moduleName);
    });
});

// Her skiftes indholdet af content til det som er specificeret i det valgte moduleName.
function showModule(moduleName) {
    const content = document.getElementById('content');

    if (moduleName === 'calculator') {
        content.innerHTML = `
        <h2>Calorie Calculator</h2>
        <form id="calorie-form">
            <label for="age">Alder:</label>
            <input type="number" id="age" value="23" required>

            <label>Køn:</label>
            <div class="radio-group">
                <label><input type="radio" name="gender" value="male" checked> Mand</label>
                <label><input type="radio" name="gender" value="female"> Kvinde</label>
            </div>

            <label for="height">Højde (cm):</label>
            <input type="number" id="height" value="185" required>

            <label for="weight">Vægt (kg):</label>
            <input type="number" id="weight" value="85" required>

            <label for="activity">Aktivitet:</label>
            <select id="activity">
                <option value="1.2">Stillesiddende (kontorjob, ingen motion)</option>
                <option value="1.375">Lidt aktiv (let træning 1-3 dage/uge)</option>
                <option value="1.55" selected>Moderat aktiv (træning 3-5 dage/uge)</option>
                <option value="1.725">Meget aktiv (hård træning 6-7 dage/uge)</option>
                <option value="1.9">Ekstremt aktiv (eliteidræt/hårdt fysisk job)</option>
            </select>

            <button type="submit" class="nav-button full-width">Beregn</button>
        </form>

        <div id="calorieResult"></div>
    `;
        setupCalorieCalculator();


    } else if (moduleName === 'bmi') {
        content.innerHTML = `
        <h2>BMI beregner</h2>
        <form id="bmi-form">
            <label for="age">Alder:</label>
            <input type="number" id="age" value="23" required>

            <label>Køn:</label>
            <div class="radio-group">
                <label><input type="radio" name="gender" value="male" checked> Mand</label>
                <label><input type="radio" name="gender" value="female"> Kvinde</label>
            </div>

            <label for="height">Højde (cm):</label>
            <input type="number" id="height" value="185" required>

            <label for="weight">Vægt (kg):</label>
            <input type="number" id="weight" value="85" required>

            <button type="submit" class="nav-button full-width">Beregn</button>
        </form>

        <div id="bmiResult"></div>                  
        `;

        setupBMICalculator();


    } else if (moduleName === 'about') {
        content.innerHTML = `
                            <h2>About Lucas's calculator</h2>
                            <p>Dette er Lucas's beregnere, det er et lille projekt hvor 
                            man kan få udregnet nogle ting om sin krop.</p>
                            `
    }
}

function setupCalorieCalculator() {
    const form = document.getElementById('calorie-form');

    form.addEventListener('submit', (e) => {
        // Forhindrer at siden genindlæses ved tryk på knap
        e.preventDefault();

        // Henter værdierne fra input felterne.
        const age = parseFloat(document.getElementById('age').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const activityMultiplier = parseFloat(document.getElementById('activity').value);

        // Beregn BMR ((Basal metabolic rate))
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);

        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        // Gang med aktivitetsniveau for samlet dagligt kaloriebehov
        const totalCalories = Math.round(bmr * activityMultiplier);

        const resultDiv = document.getElementById('calorieResult');
        resultDiv.innerHTML = `
            <h3>Dit estimerede kaloriebehov:</h3>
            <p><strong>${totalCalories} kcal</strong> om dagen for at holde din nuværende vægt</p>
            `;
    });
}

function setupBMICalculator() {
    const form = document.getElementById('bmi-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Henter værdierne fra input felterne
        const age = parseFloat(document.getElementById('age').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;

        // Beregn BMI
        let bmi = (weight / Math.pow((height / 100), 2)).toFixed(1);
        let situation;

        if(bmi >= 30) {
            situation = "Fed";
        } else if (bmi >= 25) {
            situation = "Overvægtig";
        } else if (bmi >= 18.5) {
            situation = "Normal vægtig";
        } else {
            situation = "Undervægtig";
        }

        const resultDiv = document.getElementById('bmiResult');
        resultDiv.innerHTML = `
            <h3>Din beregnede BMI:</h3>
            <p><strong>BMI: ${bmi}</strong>. Du er altså ${situation}</p>
        `;
    });
}

showModule('calculator');