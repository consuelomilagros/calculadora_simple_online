// logica_calculadora.js
let isExponentMode = false; // Bandera para controlar el modo exponente
let baseValue = null; // Guardará la base cuando se presione xⁿ

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function validateInput(input) {
    // Permitir solo números, operadores matemáticos, paréntesis, punto decimal, y guion bajo
    input.value = input.value.replace(/[^0-9+\-*/().^√logsincoatan_]/g, '');
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        let expression = display.value;

        if (/log_([0-9]+)\s*\(\s*([0-9.]+)\s*\)/.test(expression)) {
            // Extraer base y argumento
            const match = expression.match(/log_([0-9]+)\s*\(\s*([0-9.]+)\s*\)/);
            const base = parseFloat(match[1]);
            const num = parseFloat(match[2]);

            // Calcular el logaritmo en base n
            display.value = Math.log(num) / Math.log(base);
            return;
        }

        // Otros reemplazos y evaluación utilizando REGEX para JS 
        expression = expression.replace(/√(\d+)/g, 'Math.sqrt($1)');
        expression = expression.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
        console.log("Expresión evaluada: ", expression);
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePercentage() {
    const display = document.getElementById('display');
    try {
        display.value = parseFloat(display.value) / 100;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateRaiz(){
    const display= document.getElementById('display');
    try {
        display.value= Math.sqrt(eval(display.value));
    } catch (error){
        display.value= 'Error';
    }
}

function calculateExponent() {
    const display = document.getElementById('display');

    // Si no estamos en modo exponente, guarda la base y activa el modo
    if (!isExponentMode) {
        baseValue = parseFloat(display.value);
        if (isNaN(baseValue)) {
            display.value = 'Error'; // Error si no hay un número válido
            return;
        }
        isExponentMode = true;
        display.value = ''; // Limpia el display para que el usuario ingrese el exponente
    } else {
        // Si estamos en modo exponente, toma el exponente y calcula
        const exponentValue = parseFloat(display.value);
        if (isNaN(exponentValue)) {
            display.value = 'Error'; // Error si no hay un número válido
            return;
        }
        display.value = Math.pow(baseValue, exponentValue);
        isExponentMode = false; // Resetea el modo exponente
        baseValue = null; // Limpia el valor de la base
    }
}
