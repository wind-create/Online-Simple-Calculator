class Calculator {
    //konstraktor untuk mengambil elemen operator
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }
    // fungsi untuk membersihkan elemen
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    // fungsi untuk menghapus angka
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // penggunaan slice untuk menghapus alamat angka
    }
    // fungsi untuk memunculkan angka
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    // fungsi untuk mengambil elemen operator
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.count()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    // fungsi untuk menghitung operasi 2 angka
    count() {
        let computation
        const prev = parseFloat(this.previousOperand) // mengubah menjadi tipe data float
        const current = parseFloat(this.currentOperand) // mengubah menjadi tipe data float
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+': // operator penjumlahan
                computation = prev + current
                break
            case '-': // operator pengurangan
                computation = prev - current
                break
            case '*': // operator perkalian
                computation = prev * current
                break
            case '/': //operator pembagian
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    // fungsi untuk menampilkan angka
    displayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    // fungsi untuk mengupdate hasil
    updateDisplay() {
        this.currentText.innerText =
            this.displayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousText.innerText =
                `${this.displayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousText.innerText = ''
        }
    }
}

// query document selector untuk memilih semua elemen yang sesuai dengan atribut yang dituju
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousText = document.querySelector('[data-previous-operand]')
const currentText = document.querySelector('[data-current-operand]')

// pemanggilan class Calculator
const calculator = new Calculator(previousText, currentText)
// untuk pemanggilan fungsi pada tombol angka
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
// untuk pemanggilan fungsi pada tombol operator
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
// untuk pemanggilan fungsi menghitung operasi 2 angka
equalsButton.addEventListener('click', button => {
    calculator.count()
    calculator.updateDisplay()
})
// untuk pemanggilan fungsi menghapus semua elemen pada tombol clear
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
// untuk pemanggilan fungsi menghapus angka pada tomobol delete
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})