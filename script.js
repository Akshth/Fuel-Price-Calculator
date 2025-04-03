// Average mileage data
const averageMileage = {
    bike: { petrol: 50, diesel: 60, cng: 45, lpg: 40, electric: 80 },
    auto: { petrol: 35, diesel: 40, cng: 30, lpg: 25, electric: 60 },
    car: { petrol: 15, diesel: 20, cng: 18, lpg: 12, electric: 8 },
    truck: { petrol: 5, diesel: 8, cng: 6, lpg: 4, electric: 2 },
    suv: { petrol: 12, diesel: 15, cng: 14, lpg: 10, electric: 6 }
};

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Update mileage unit based on fuel type
function updateMileageUnit() {
    const fuelType = document.getElementById('fuelType').value;
    const unitElement = document.getElementById('mileageUnit');
    
    if (fuelType === 'cng') {
        unitElement.textContent = 'km per kg';
    } else if (fuelType === 'electric') {
        unitElement.textContent = 'km per kWh';
    } else {
        unitElement.textContent = 'km per liter';
    }
}

// Show error message to user
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorElement.style.display = 'block';
    successElement.style.display = 'none';
    
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess() {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    errorElement.style.display = 'none';
    successElement.style.display = 'block';
    
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 3000);
}

// Calculate fuel costs
function calculateFuelCost() {
    // Get user inputs
    const vehicleType = document.getElementById('vehicleType').value;
    const fuelType = document.getElementById('fuelType').value;
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    const dailyKm = parseFloat(document.getElementById('dailyKm').value) || 0;
    const currency = document.getElementById('currency').value;
    let mileage = parseFloat(document.getElementById('mileage').value);
    
    // Validate inputs
    if (isNaN(fuelPrice) || fuelPrice <= 0) {
        showError("Please enter a valid fuel price");
        return;
    }
    
    if (dailyKm <= 0) {
        showError("Please enter a valid daily distance");
        return;
    }
    
    // Set default mileage if not provided
    if (!mileage || mileage <= 0) {
        mileage = averageMileage[vehicleType][fuelType];
        // Show a note that average mileage was used
        showSuccess();
    }
    
    // Calculate costs
    const dailyFuel = dailyKm / mileage;
    const dailyCost = dailyFuel * fuelPrice;
    const weeklyCost = dailyCost * 7;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    
    // Update currency symbols
    document.querySelectorAll('#currencySymbol1, #currencySymbol2, #currencySymbol3, #currencySymbol4')
        .forEach(el => el.textContent = currency);
    
    // Display results
    document.getElementById('dailyCost').textContent = dailyCost.toFixed(2);
    document.getElementById('weeklyCost').textContent = weeklyCost.toFixed(2);
    document.getElementById('monthlyCost').textContent = monthlyCost.toFixed(2);
    document.getElementById('yearlyCost').textContent = yearlyCost.toFixed(2);
    
    // Show result section with animation
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    
    // Reset animations
    const costItems = document.querySelectorAll('.cost-item');
    costItems.forEach(item => {
        item.style.animation = 'none';
        void item.offsetHeight; // Trigger reflow
        item.style.animation = '';
    });
    
    // Scroll to results smoothly
    setTimeout(() => {
        resultElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Initialize - set up event listeners
window.onload = function() {
    checkTheme();
    updateMileageUnit();
    
    // Set up event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('fuelType').addEventListener('change', updateMileageUnit);
    document.getElementById('fuelPrice').focus();
    
    // Add animation to calculator on load
    const calculator = document.querySelector('.calculator');
    calculator.style.opacity = 0;
    calculator.style.transform = 'translateY(20px)';
    calculator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        calculator.style.opacity = 1;
        calculator.style.transform = 'translateY(0)';
    }, 100);
};

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initialize theme and back button
window.onload = function() {
    checkTheme();
    
    // Set up theme toggle if it exists on the page
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
};