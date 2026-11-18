/**
 * FinTrack Pro - Aplikasi Pencatatan Keuangan Pintar
 * Comprehensive Modern Personal Finance Tracker with Chart.js & LocalStorage
 */

// ==========================================
// 1. DATA MASTER & DEFAULT VALUES
// ==========================================

const DEFAULT_ACCOUNTS = [
  {
    id: "acc-1",
    name: "Bank BCA",
    type: "bank",
    initialBalance: 12500000,
    color: "from-blue-600 to-indigo-700",
    icon: "fa-building-columns"
  },
  {
    id: "acc-2",
    name: "Bank Mandiri",
    type: "bank",
    initialBalance: 6200000,
    color: "from-amber-600 to-amber-700",
    icon: "fa-credit-card"
  },
  {
    id: "acc-3",
    name: "GoPay / OVO",
    type: "ewallet",
    initialBalance: 450000,
    color: "from-cyan-600 to-teal-700",
    icon: "fa-mobile-screen-button"
  },
  {
    id: "acc-4",
    name: "Dompet Tunai (Cash)",
    type: "cash",
    initialBalance: 850000,
    color: "from-emerald-600 to-green-700",
    icon: "fa-money-bill-wave"
  },
  {
    id: "acc-5",
    name: "Investasi Bibit",
    type: "investment",
    initialBalance: 15000000,
    color: "from-purple-600 to-indigo-800",
    icon: "fa-chart-line"
  }
];

const CATEGORIES = {
  expense: [
    { name: "Makanan & Minuman", icon: "fa-utensils", color: "#f97316" },
    { name: "Belanja Kebutuhan", icon: "fa-cart-shopping", color: "#3b82f6" },
    { name: "Transportasi", icon: "fa-gas-pump", color: "#eab308" },
    { name: "Tagihan & Utilitas", icon: "fa-bolt", color: "#ef4444" },
    { name: "Hiburan & Rekreasi", icon: "fa-film", color: "#a855f7" },
    { name: "Kesehatan", icon: "fa-heart-pulse", color: "#10b981" },
    { name: "Pendidikan", icon: "fa-graduation-cap", color: "#06b6d4" },
    { name: "Cicilan & Utang", icon: "fa-handshake", color: "#f43f5e" },
    { name: "Lain-lain", icon: "fa-shapes", color: "#64748b" }
  ],
  income: [
    { name: "Gaji Utama", icon: "fa-briefcase", color: "#10b981" },
    { name: "Bonus & THR", icon: "fa-gift", color: "#06b6d4" },
    { name: "Usaha Sampingan", icon: "fa-laptop-code", color: "#3b82f6" },
    { name: "Hasil Investasi", icon: "fa-arrow-trend-up", color: "#8b5cf6" },
    { name: "Hadiah / Cashback", icon: "fa-coins", color: "#f59e0b" },
    { name: "Lain-lain", icon: "fa-wallet", color: "#64748b" }
  ]
};

// Sample realistic initial transactions
const SAMPLE_TRANSACTIONS = [
  {
    id: "trx-001",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 12).toISOString().slice(0, 10),
    type: "income",
    accountId: "acc-1",
    category: "Gaji Utama",
    amount: 15000000,
    note: "Gaji Bulanan PT Maju Jaya",
    tag: "#gajian"
  },
  {
    id: "trx-002",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 10).toISOString().slice(0, 10),
    type: "expense",
    accountId: "acc-1",
    category: "Belanja Kebutuhan",
    amount: 1850000,
    note: "Belanja bulanan di Supermarket",
    tag: "#kebutuhan"
  },
  {
    id: "trx-003",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 7).toISOString().slice(0, 10),
    type: "expense",
    accountId: "acc-4",
    category: "Makanan & Minuman",
    amount: 85000,
    note: "Makan siang ramen & kopi",
    tag: "#makan"
  },
  {
    id: "trx-004",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 5).toISOString().slice(0, 10),
    type: "expense",
    accountId: "acc-3",
    category: "Transportasi",
    amount: 150000,
    note: "Isi saldo bensin & e-toll",
    tag: "#transport"
  },
  {
    id: "trx-005",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 4).toISOString().slice(0, 10),
    type: "expense",
    accountId: "acc-2",
    category: "Tagihan & Utilitas",
    amount: 850000,
    note: "Listrik PLN & WiFi Internet",
    tag: "#rutin"
  },
  {
    id: "trx-006",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 3).toISOString().slice(0, 10),
    type: "income",
    accountId: "acc-2",
    category: "Usaha Sampingan",
    amount: 3200000,
    note: "Honor Pembuatan Website Klien",
    tag: "#freelance"
  },
  {
    id: "trx-007",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString().slice(0, 10),
    type: "expense",
    accountId: "acc-3",
    category: "Hiburan & Rekreasi",
    amount: 210000,
    note: "Nonton Bioskop & Cemilan",
    tag: "#weekend"
  },
  {
    id: "trx-008",
    date: new Date(Date.now() - 3600 * 1000 * 12).toISOString().slice(0, 10),
    type: "transfer",
    accountId: "acc-1", // Source
    toAccountId: "acc-4", // Destination
    category: "Transfer",
    amount: 500000,
    note: "Tarik Tunai ATM untuk uang pegangan",
    tag: "#tariktunai"
  }
];

const DEFAULT_BUDGETS = [
  { id: "bg-1", category: "Makanan & Minuman", monthlyLimit: 2500000 },
  { id: "bg-2", category: "Belanja Kebutuhan", monthlyLimit: 3000000 },
  { id: "bg-3", category: "Hiburan & Rekreasi", monthlyLimit: 1000000 },
  { id: "bg-4", category: "Transportasi", monthlyLimit: 1200000 },
  { id: "bg-5", category: "Tagihan & Utilitas", monthlyLimit: 1500000 }
];

const DEFAULT_SAVINGS_GOALS = [
  {
    id: "goal-1",
    name: "Dana Darurat (6 Bulan)",
    targetAmount: 30000000,
    currentAmount: 18500000,
    targetDate: "2026-12-31",
    icon: "fa-shield-halved",
    color: "emerald"
  },
  {
    id: "goal-2",
    name: "Beli Laptop MacBook Pro",
    targetAmount: 20000000,
    currentAmount: 13500000,
    targetDate: "2027-03-30",
    icon: "fa-laptop",
    color: "indigo"
  },
  {
    id: "goal-3",
    name: "Liburan Akhir Tahun",
    targetAmount: 12000000,
    currentAmount: 5500000,
    targetDate: "2026-12-20",
    icon: "fa-plane-departure",
    color: "amber"
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

let state = {
  accounts: [],
  transactions: [],
  budgets: [],
  savingsGoals: [],
  activeTab: "dashboard",
  currentModalTrxType: "expense",
  charts: {
    cashflow: null,
    category: null
  }
};

// ==========================================
// 3. STORAGE & LIFECYCLE
// ==========================================

function loadStateFromStorage() {
  const savedAcc = localStorage.getItem("ft_accounts");
  state.accounts = savedAcc ? JSON.parse(savedAcc) : [ ...DEFAULT_ACCOUNTS ];

  const savedTrx = localStorage.getItem("ft_transactions");
  state.transactions = savedTrx ? JSON.parse(savedTrx) : [ ...SAMPLE_TRANSACTIONS ];

  const savedBudgets = localStorage.getItem("ft_budgets");
  state.budgets = savedBudgets ? JSON.parse(savedBudgets) : [ ...DEFAULT_BUDGETS ];

  const savedGoals = localStorage.getItem("ft_goals");
  state.savingsGoals = savedGoals ? JSON.parse(savedGoals) : [ ...DEFAULT_SAVINGS_GOALS ];

  // Save to storage if first run
  if (!savedAcc) saveAccounts();
  if (!savedTrx) saveTransactions();
  if (!savedBudgets) saveBudgets();
  if (!savedGoals) saveSavingsGoals();

  // Dark mode init
  const isDark = localStorage.getItem("ft_dark_mode") === "true";
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function saveAccounts() {
  localStorage.setItem("ft_accounts", JSON.stringify(state.accounts));
}

function saveTransactions() {
  localStorage.setItem("ft_transactions", JSON.stringify(state.transactions));
}

function saveBudgets() {
  localStorage.setItem("ft_budgets", JSON.stringify(state.budgets));
}

function saveSavingsGoals() {
  localStorage.setItem("ft_goals", JSON.stringify(state.savingsGoals));
}

function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("ft_dark_mode", isDark);
  renderAllCharts(); // Re-render charts with appropriate grid lines and labels
}

// ==========================================
// 4. HELPER & FORMATTING UTILITIES
// ==========================================

function formatRupiah(amount) {
  return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  const colors = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    info: "bg-indigo-600 text-white",
    warning: "bg-amber-500 text-white"
  };

  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation"
  };

  toast.className = `toast px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold ${colors[type] || colors.info}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

// ==========================================
// 5. CALCULATIONS (ACCOUNTS & CASHFLOW)
// ==========================================

function calculateAccountBalance(accountId) {
  const acc = state.accounts.find(a => a.id === accountId);
  if (!acc) return 0;

  let balance = acc.initialBalance || 0;

  state.transactions.forEach(t => {
    if (t.type === "income" && t.accountId === accountId) {
      balance += t.amount;
    } else if (t.type === "expense" && t.accountId === accountId) {
      balance -= t.amount;
    } else if (t.type === "transfer") {
      if (t.accountId === accountId) balance -= t.amount; // Source
      if (t.toAccountId === accountId) balance += t.amount; // Destination
    }
  });

  return balance;
}

function calculateTotalNetWorth() {
  return state.accounts.reduce((total, acc) => total + calculateAccountBalance(acc.id), 0);
}

function getMonthTransactions(date = new Date()) {
  const yearMonth = date.toISOString().slice(0, 7); // e.g., "2026-11"
  return state.transactions.filter(t => t.date && t.date.startsWith(yearMonth));
}

function calculateMonthlyStats(date = new Date()) {
  const monthlyTrx = getMonthTransactions(date);

  let income = 0;
  let expense = 0;

  monthlyTrx.forEach(t => {
    if (t.type === "income") income += t.amount;
    if (t.type === "expense") expense += t.amount;
  });

  const net = income - expense;
  const savingsRate = income > 0 ? Math.round((net / income) * 100) : 0;
  const expenseRatio = income > 0 ? Math.round((expense / income) * 100) : 0;

  return { income, expense, net, savingsRate, expenseRatio };
}

function updateFinancialHealth() {
  const { income, expense, expenseRatio } = calculateMonthlyStats();
  const badge = document.getElementById("financialHealthBadge");
  const text = document.getElementById("financialHealthText");

  if (!badge || !text) return;

  if (income === 0 && expense === 0) {
    badge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500";
    text.innerText = "Belum Ada Data";
    return;
  }

  if (expenseRatio <= 50) {
    badge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300";
    text.innerText = "Sangat Prima (<50%)";
  } else if (expenseRatio <= 75) {
    badge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300";
    text.innerText = "Sehat Terkendali";
  } else if (expenseRatio <= 100) {
    badge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300";
    text.innerText = "Ketat / Waspada";
  } else {
    badge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300";
    text.innerText = "Defisit Keuangan!";
  }
}

// ==========================================
// 6. TAB NAVIGATION
// ==========================================

function switchTab(tabName) {
  state.activeTab = tabName;

  // Toggle active tab buttons
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.classList.remove("active");
    btn.classList.add("text-slate-500", "dark:text-slate-400");
  });
  const activeBtn = document.getElementById(`navTab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.classList.remove("text-slate-500", "dark:text-slate-400");
  }

  // Toggle content containers
  const tabs = ["dashboard", "transaksi", "anggaran", "target", "dompet"];
  tabs.forEach(t => {
    const el = document.getElementById(`tabContent-${t}`);
    if (el) {
      if (t === tabName) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  // Re-render specific tab contents
  if (tabName === "dashboard") {
    renderDashboard();
  } else if (tabName === "transaksi") {
    renderTransactionsTable();
  } else if (tabName === "anggaran") {
    renderBudgets();
  } else if (tabName === "target") {
    renderSavingsGoals();
  } else if (tabName === "dompet") {
    renderAccountsList();
  }
}

// ==========================================
// 7. DASHBOARD RENDERING & CHARTS
// ==========================================

function renderDashboard() {
  const totalBalance = calculateTotalNetWorth();
  const { income, expense, net, savingsRate, expenseRatio } = calculateMonthlyStats();

  // Top KPIs
  document.getElementById("headerTotalBalance").innerText = formatRupiah(totalBalance);
  document.getElementById("dashTotalBalance").innerText = formatRupiah(totalBalance);
  document.getElementById("dashMonthIncome").innerText = formatRupiah(income);
  document.getElementById("dashMonthExpense").innerText = formatRupiah(expense);
  document.getElementById("dashMonthNet").innerText = formatRupiah(net);
  document.getElementById("dashSavingsRate").innerText = `${savingsRate}%`;
  document.getElementById("dashExpenseRatio").innerText = `${expenseRatio}%`;
  document.getElementById("dashAccountCount").innerText = state.accounts.length;

  updateFinancialHealth();
  renderWalletQuickCards();
  renderRecentTransactionsList();
  renderSavingsMiniGoals();
  renderAllCharts();
}

function renderWalletQuickCards() {
  const container = document.getElementById("walletCardsContainer");
  if (!container) return;

  container.innerHTML = state.accounts.map(acc => {
    const bal = calculateAccountBalance(acc.id);
    return `
      <div class="wallet-card bg-gradient-to-br ${acc.color || 'from-slate-700 to-slate-900'} text-white p-4 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold opacity-90">${acc.name}</span>
          <i class="fa-solid ${acc.icon || 'fa-wallet'} opacity-75 text-sm"></i>
        </div>
        <div class="mt-3">
          <div class="text-[10px] uppercase tracking-wider opacity-75">Saldo Saat Ini</div>
          <div class="text-base font-extrabold font-mono">${formatRupiah(bal)}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderRecentTransactionsList() {
  const container = document.getElementById("dashRecentTransactions");
  if (!container) return;

  const sorted = [ ...state.transactions ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 text-xs">
        Belum ada catatan transaksi. Klik tombol "Catat Transaksi" untuk mulai.
      </div>
    `;
    return;
  }

  container.innerHTML = sorted.map(t => {
    const acc = state.accounts.find(a => a.id === t.accountId);
    const toAcc = t.toAccountId ? state.accounts.find(a => a.id === t.toAccountId) : null;

    let icon = "fa-arrow-up-long";
    let iconBg = "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400";
    let amountSign = "-";
    let amountColor = "text-rose-600 dark:text-rose-400";

    if (t.type === "income") {
      icon = "fa-arrow-down-long";
      iconBg = "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400";
      amountSign = "+";
      amountColor = "text-emerald-600 dark:text-emerald-400";
    } else if (t.type === "transfer") {
      icon = "fa-arrow-right-arrow-left";
      iconBg = "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400";
      amountSign = "";
      amountColor = "text-indigo-600 dark:text-indigo-400";
    }

    const accountLabel = t.type === "transfer" 
      ? `${acc?.name || '-'} &rarr; ${toAcc?.name || '-'}`
      : `${acc?.name || '-'}`;

    return `
      <div class="py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center text-xs flex-shrink-0">
            <i class="fa-solid ${icon}"></i>
          </div>
          <div class="min-w-0">
            <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${t.note || t.category}</h4>
            <p class="text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
              <span>${t.category}</span> &bull; <span>${accountLabel}</span> &bull; <span>${formatDateIndo(t.date)}</span>
            </p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <span class="text-xs font-extrabold font-mono ${amountColor}">
            ${amountSign} ${formatRupiah(t.amount)}
          </span>
        </div>
      </div>
    `;
  }).join("");
}

function renderSavingsMiniGoals() {
  const container = document.getElementById("dashSavingsMiniList");
  if (!container) return;

  if (state.savingsGoals.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">Belum ada target impian.</p>`;
    return;
  }

  container.innerHTML = state.savingsGoals.slice(0, 3).map(goal => {
    const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
    return `
      <div class="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <i class="fa-solid ${goal.icon || 'fa-piggy-bank'} text-indigo-500"></i>
            ${goal.name}
          </span>
          <span class="text-xs font-extrabold font-mono text-indigo-600 dark:text-indigo-400">${percent}%</span>
        </div>
        <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div class="bg-indigo-600 h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
        </div>
        <div class="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>${formatRupiah(goal.currentAmount)}</span>
          <span>Target: ${formatRupiah(goal.targetAmount)}</span>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================
// 8. CHART.JS VISUALIZATIONS
// ==========================================

function renderAllCharts() {
  renderCashflowTrendChart();
  renderCategoryDonutChart();
}

function renderCashflowTrendChart() {
  const ctx = document.getElementById("cashflowTrendChart");
  if (!ctx) return;

  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";

  // Generate last 6 months labels
  const months = [];
  const monthLabels = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toISOString().slice(0, 7);
    months.push(key);
    monthLabels.push(d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" }));
  }

  // Aggregate monthly amounts
  const incomeData = months.map(m => {
    return state.transactions
      .filter(t => t.type === "income" && t.date && t.date.startsWith(m))
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const expenseData = months.map(m => {
    return state.transactions
      .filter(t => t.type === "expense" && t.date && t.date.startsWith(m))
      .reduce((sum, t) => sum + t.amount, 0);
  });

  if (state.charts.cashflow) {
    state.charts.cashflow.destroy();
  }

  state.charts.cashflow = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthLabels,
      datasets: [
        {
          label: "Pemasukan",
          data: incomeData,
          backgroundColor: "#10b981",
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: "Pengeluaran",
          data: expenseData,
          backgroundColor: "#f43f5e",
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textColor,
            font: { family: "Plus Jakarta Sans", size: 11, weight: 600 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatRupiah(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { family: "Plus Jakarta Sans", size: 11 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "JetBrains Mono", size: 10 },
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
              if (value >= 1000) return (value / 1000).toFixed(0) + "k";
              return value;
            }
          }
        }
      }
    }
  });
}

function renderCategoryDonutChart() {
  const ctx = document.getElementById("categoryPieChart");
  const emptyNotice = document.getElementById("emptyPieNotice");
  if (!ctx) return;

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthExpenses = state.transactions.filter(t => t.type === "expense" && t.date && t.date.startsWith(currentMonthKey));

  if (monthExpenses.length === 0) {
    if (state.charts.category) {
      state.charts.category.destroy();
      state.charts.category = null;
    }
    emptyNotice?.classList.remove("hidden");
    return;
  }

  emptyNotice?.classList.add("hidden");

  // Sum by category
  const categoryTotals = {};
  monthExpenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  const colors = [
    "#f97316", "#3b82f6", "#10b981", "#a855f7", "#eab308",
    "#ef4444", "#06b6d4", "#f43f5e", "#64748b"
  ];

  if (state.charts.category) {
    state.charts.category.destroy();
  }

  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#94a3b8" : "#64748b";

  state.charts.category = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: isDark ? "#1e293b" : "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            color: textColor,
            font: { family: "Plus Jakarta Sans", size: 10, weight: 500 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((val / total) * 100);
              return ` ${context.label}: ${formatRupiah(val)} (${percentage}%)`;
            }
          }
        }
      },
      cutout: "68%"
    }
  });
}

// ==========================================
// 9. TRANSACTIONS CRUD & FILTERS
// ==========================================

function renderTransactionsTable() {
  const tbody = document.getElementById("transactionsTableBody");
  const emptyNotice = document.getElementById("emptyTableNotice");
  const countBadge = document.getElementById("trxTableCountBadge");
  const accountSelect = document.getElementById("filterAccountSelect");

  // Populate account filter select
  if (accountSelect && accountSelect.options.length <= 1) {
    state.accounts.forEach(acc => {
      const opt = document.createElement("option");
      opt.value = acc.id;
      opt.innerText = acc.name;
      accountSelect.appendChild(opt);
    });
  }

  const search = document.getElementById("filterSearchInput")?.value.toLowerCase().trim() || "";
  const typeFilter = document.getElementById("filterTypeSelect")?.value || "all";
  const accFilter = document.getElementById("filterAccountSelect")?.value || "all";
  const periodFilter = document.getElementById("filterPeriodSelect")?.value || "all";

  const now = new Date();
  const currentMonthKey = now.toISOString().slice(0, 7);
  const currentYearKey = String(now.getFullYear());
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  let filtered = state.transactions.filter(t => {
    // Search matching
    const matchSearch = !search || 
      (t.note && t.note.toLowerCase().includes(search)) ||
      (t.category && t.category.toLowerCase().includes(search)) ||
      (t.tag && t.tag.toLowerCase().includes(search));

    // Type matching
    const matchType = typeFilter === "all" || t.type === typeFilter;

    // Account matching
    const matchAcc = accFilter === "all" || t.accountId === accFilter || t.toAccountId === accFilter;

    // Period matching
    let matchPeriod = true;
    if (periodFilter === "this_month") {
      matchPeriod = t.date && t.date.startsWith(currentMonthKey);
    } else if (periodFilter === "last_30_days") {
      matchPeriod = t.date && t.date >= thirtyDaysAgo;
    } else if (periodFilter === "this_year") {
      matchPeriod = t.date && t.date.startsWith(currentYearKey);
    }

    return matchSearch && matchType && matchAcc && matchPeriod;
  });

  // Sort newest first
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  countBadge.innerText = `${filtered.length} transaksi ditemukan`;

  if (filtered.length === 0) {
    tbody.innerHTML = "";
    emptyNotice?.classList.remove("hidden");
    return;
  }

  emptyNotice?.classList.add("hidden");

  tbody.innerHTML = filtered.map(t => {
    const acc = state.accounts.find(a => a.id === t.accountId);
    const toAcc = t.toAccountId ? state.accounts.find(a => a.id === t.toAccountId) : null;

    let typeBadge = "";
    let amountSign = "-";
    let amountColor = "text-rose-600 dark:text-rose-400";

    if (t.type === "income") {
      typeBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Pemasukan</span>`;
      amountSign = "+";
      amountColor = "text-emerald-600 dark:text-emerald-400";
    } else if (t.type === "expense") {
      typeBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">Pengeluaran</span>`;
    } else if (t.type === "transfer") {
      typeBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">Transfer</span>`;
      amountSign = "";
      amountColor = "text-indigo-600 dark:text-indigo-400";
    }

    const accountStr = t.type === "transfer" 
      ? `${acc?.name || '-'} &rarr; ${toAcc?.name || '-'}`
      : `${acc?.name || '-'}`;

    return `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
        <td class="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400 text-[11px]">
          ${formatDateIndo(t.date)}
        </td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 dark:text-slate-100 text-xs">${t.note || t.category}</span>
            ${t.tag ? `<span class="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">${t.tag}</span>` : ''}
          </div>
          <div class="flex items-center gap-2 mt-0.5">
            ${typeBadge}
            <span class="text-[11px] text-slate-400">&bull; ${t.category}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
          ${accountStr}
        </td>
        <td class="py-3.5 px-4 text-right font-mono font-bold text-sm ${amountColor}">
          ${amountSign} ${formatRupiah(t.amount)}
        </td>
        <td class="py-3.5 px-4 text-center space-x-1">
          <button onclick="deleteTransaction('${t.id}')" title="Hapus Transaksi" class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-slate-500 hover:text-rose-600 transition-colors">
            <i class="fa-regular fa-trash-can text-xs"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

// Modal Transaction Handlers
function openTransactionModal() {
  document.getElementById("transactionModal").classList.remove("hidden");
  document.getElementById("transactionForm").reset();
  document.getElementById("trxFormId").value = "";
  document.getElementById("trxFormDate").value = new Date().toISOString().slice(0, 10);

  // Populate Accounts
  populateModalAccountOptions();
  setTransactionType("expense");
}

function closeTransactionModal() {
  document.getElementById("transactionModal").classList.add("hidden");
}

function setTransactionType(type) {
  state.currentModalTrxType = type;

  const btnExpense = document.getElementById("trxTypeBtn-expense");
  const btnIncome = document.getElementById("trxTypeBtn-income");

  if (type === "expense") {
    btnExpense.className = "py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all bg-rose-600 text-white shadow-sm";
    btnIncome.className = "py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all text-slate-600 dark:text-slate-300";
  } else {
    btnIncome.className = "py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 text-white shadow-sm";
    btnExpense.className = "py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all text-slate-600 dark:text-slate-300";
  }

  // Populate Categories
  const categorySelect = document.getElementById("trxFormCategory");
  const cats = CATEGORIES[type] || [];
  categorySelect.innerHTML = cats.map(c => `
    <option value="${c.name}">${c.name}</option>
  `).join("");
}

function populateModalAccountOptions() {
  const accSelect = document.getElementById("trxFormAccount");
  accSelect.innerHTML = state.accounts.map(a => `
    <option value="${a.id}">${a.name} (${formatRupiah(calculateAccountBalance(a.id))})</option>
  `).join("");
}

function handleTransactionSubmit(e) {
  e.preventDefault();

  const amount = Number(document.getElementById("trxFormAmount").value) || 0;
  const category = document.getElementById("trxFormCategory").value;
  const accountId = document.getElementById("trxFormAccount").value;
  const date = document.getElementById("trxFormDate").value;
  const tag = document.getElementById("trxFormTag").value.trim();
  const note = document.getElementById("trxFormNote").value.trim();

  if (amount <= 0) {
    showToast("Nominal harus lebih dari 0", "error");
    return;
  }

  const newTrx = {
    id: "trx-" + Date.now(),
    date,
    type: state.currentModalTrxType,
    accountId,
    category,
    amount,
    note,
    tag: tag ? (tag.startsWith("#") ? tag : "#" + tag) : ""
  };

  state.transactions.unshift(newTrx);
  saveTransactions();

  closeTransactionModal();
  showToast("Transaksi berhasil dicatat!", "success");

  // Re-render
  renderDashboard();
  renderTransactionsTable();
  renderBudgets();
}

function deleteTransaction(id) {
  if (confirm("Hapus transaksi ini dari catatan?")) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveTransactions();
    showToast("Transaksi telah dihapus", "info");
    renderDashboard();
    renderTransactionsTable();
    renderBudgets();
  }
}

function clearAllTransactionsConfirm() {
  if (state.transactions.length === 0) return;
  if (confirm("PERINGATAN: Semua riwayat transaksi akan dihapus secara permanen. Lanjutkan?")) {
    state.transactions = [];
    saveTransactions();
    renderDashboard();
    renderTransactionsTable();
    renderBudgets();
    showToast("Semua data transaksi telah dibersihkan", "info");
  }
}

// ==========================================
// 10. TRANSFER ANTAR AKUN
// ==========================================

function openTransferModal() {
  const fromSelect = document.getElementById("transferFromAccount");
  const toSelect = document.getElementById("transferToAccount");

  const optionsHtml = state.accounts.map(a => `
    <option value="${a.id}">${a.name} (Saldo: ${formatRupiah(calculateAccountBalance(a.id))})</option>
  `).join("");

  fromSelect.innerHTML = optionsHtml;
  toSelect.innerHTML = optionsHtml;

  // Set default to 2nd item if available
  if (state.accounts.length > 1) {
    toSelect.selectedIndex = 1;
  }

  document.getElementById("transferForm").reset();
  document.getElementById("transferModal").classList.remove("hidden");
}

function closeTransferModal() {
  document.getElementById("transferModal").classList.add("hidden");
}

function handleTransferSubmit(e) {
  e.preventDefault();

  const fromAccId = document.getElementById("transferFromAccount").value;
  const toAccId = document.getElementById("transferToAccount").value;
  const amount = Number(document.getElementById("transferAmount").value) || 0;
  const note = document.getElementById("transferNote").value.trim() || "Transfer Antar Akun";

  if (fromAccId === toAccId) {
    showToast("Akun asal dan akun tujuan tidak boleh sama!", "error");
    return;
  }

  const fromBal = calculateAccountBalance(fromAccId);
  if (amount > fromBal) {
    if (!confirm(`Peringatan: Saldo sumber hanya ${formatRupiah(fromBal)}. Tetap lanjutkan transfer?`)) {
      return;
    }
  }

  const newTransfer = {
    id: "trx-trf-" + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    type: "transfer",
    accountId: fromAccId,
    toAccountId: toAccId,
    category: "Transfer",
    amount,
    note,
    tag: "#transfer"
  };

  state.transactions.unshift(newTransfer);
  saveTransactions();

  closeTransferModal();
  showToast("Transfer saldo berhasil dilakukan!", "success");

  renderDashboard();
  renderTransactionsTable();
  renderAccountsList();
}

// ==========================================
// 11. BUDGETING (ANGGARAN BULANAN)
// ==========================================

function renderBudgets() {
  const container = document.getElementById("budgetsListContainer");
  const emptyNotice = document.getElementById("emptyBudgetNotice");
  if (!container) return;

  if (state.budgets.length === 0) {
    container.innerHTML = "";
    emptyNotice?.classList.remove("hidden");
    return;
  }

  emptyNotice?.classList.add("hidden");

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const currentMonthExpenses = state.transactions.filter(t => t.type === "expense" && t.date && t.date.startsWith(currentMonthKey));

  container.innerHTML = state.budgets.map(b => {
    // Calculate total spent in this category for this month
    const spent = currentMonthExpenses
      .filter(t => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);

    const percent = Math.round((spent / b.monthlyLimit) * 100);
    const remaining = b.monthlyLimit - spent;
    const isOver = remaining < 0;

    let barColor = "bg-indigo-600";
    let statusBadge = `<span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-full">Aman (${percent}%)</span>`;

    if (percent >= 100) {
      barColor = "bg-rose-600";
      statusBadge = `<span class="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">Overbudget! (${percent}%)</span>`;
    } else if (percent >= 80) {
      barColor = "bg-amber-500";
      statusBadge = `<span class="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">Waspada (${percent}%)</span>`;
    }

    return `
      <div class="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">${b.category}</h4>
            ${statusBadge}
          </div>
          
          <div class="mt-4 space-y-1.5">
            <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div class="${barColor} h-2.5 rounded-full transition-all duration-500" style="width: ${Math.min(100, percent)}%"></div>
            </div>
            
            <div class="flex justify-between text-xs font-mono pt-1">
              <span class="text-slate-500 dark:text-slate-400">Terpakai: <b class="text-slate-800 dark:text-slate-200">${formatRupiah(spent)}</b></span>
              <span class="text-slate-400">Batas: ${formatRupiah(b.monthlyLimit)}</span>
            </div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <div>
            <span class="text-[11px] text-slate-400 block">${isOver ? 'Lebih anggaran:' : 'Sisa kuota:'}</span>
            <span class="font-bold font-mono ${isOver ? 'text-rose-600' : 'text-emerald-600'}">
              ${formatRupiah(Math.abs(remaining))}
            </span>
          </div>
          <button onclick="deleteBudget('${b.id}')" title="Hapus Anggaran" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function openBudgetModal() {
  const catSelect = document.getElementById("budgetCategory");
  catSelect.innerHTML = CATEGORIES.expense.map(c => `
    <option value="${c.name}">${c.name}</option>
  `).join("");

  document.getElementById("budgetForm").reset();
  document.getElementById("budgetModal").classList.remove("hidden");
}

function closeBudgetModal() {
  document.getElementById("budgetModal").classList.add("hidden");
}

function handleBudgetSubmit(e) {
  e.preventDefault();
  const category = document.getElementById("budgetCategory").value;
  const limit = Number(document.getElementById("budgetLimit").value) || 0;

  // Check if budget for category already exists
  const existing = state.budgets.find(b => b.category === category);
  if (existing) {
    existing.monthlyLimit = limit;
    showToast(`Batas anggaran ${category} berhasil diperbarui!`, "success");
  } else {
    state.budgets.push({
      id: "bg-" + Date.now(),
      category,
      monthlyLimit: limit
    });
    showToast(`Batas anggaran ${category} berhasil dibuat!`, "success");
  }

  saveBudgets();
  closeBudgetModal();
  renderBudgets();
}

function deleteBudget(id) {
  if (confirm("Hapus batasan anggaran ini?")) {
    state.budgets = state.budgets.filter(b => b.id !== id);
    saveBudgets();
    renderBudgets();
    showToast("Anggaran telah dihapus", "info");
  }
}

// ==========================================
// 12. SAVINGS GOALS (TARGET MENABUNG)
// ==========================================

function renderSavingsGoals() {
  const container = document.getElementById("savingsGoalsGrid");
  const emptyNotice = document.getElementById("emptySavingsNotice");
  if (!container) return;

  if (state.savingsGoals.length === 0) {
    container.innerHTML = "";
    emptyNotice?.classList.remove("hidden");
    return;
  }

  emptyNotice?.classList.add("hidden");

  container.innerHTML = state.savingsGoals.map(goal => {
    const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
    const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
    const isCompleted = percent >= 100;

    return `
      <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
              <i class="fa-solid ${goal.icon || 'fa-piggy-bank'}"></i>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="openDepositModal('${goal.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1">
                <i class="fa-solid fa-plus"></i> Setor
              </button>
              <button onclick="deleteSavingsGoal('${goal.id}')" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 transition-colors">
                <i class="fa-regular fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="font-extrabold text-slate-900 dark:text-white text-base">${goal.name}</h3>
            ${goal.targetDate ? `<p class="text-[11px] text-slate-400">Target: ${formatDateIndo(goal.targetDate)}</p>` : ''}
          </div>

          <div class="mt-4 space-y-1.5">
            <div class="flex justify-between items-baseline">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">${formatRupiah(goal.currentAmount)}</span>
              <span class="text-xs font-bold text-emerald-600 font-mono">${percent}%</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
            </div>
            <div class="text-right text-[10px] text-slate-400 font-mono">
              Target: ${formatRupiah(goal.targetAmount)}
            </div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
          <span class="text-slate-400 text-[11px]">Sisa Perlu Ditabung:</span>
          <span class="font-mono font-bold ${isCompleted ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-200'}">
            ${isCompleted ? 'Target Tercapai! 🎉' : formatRupiah(remaining)}
          </span>
        </div>
      </div>
    `;
  }).join("");
}

function openSavingsGoalModal() {
  document.getElementById("savingsGoalForm").reset();
  document.getElementById("goalFormId").value = "";
  document.getElementById("savingsGoalModal").classList.remove("hidden");
}

function closeSavingsGoalModal() {
  document.getElementById("savingsGoalModal").classList.add("hidden");
}

function handleSavingsGoalSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("goalFormName").value.trim();
  const targetAmount = Number(document.getElementById("goalFormTarget").value) || 0;
  const currentAmount = Number(document.getElementById("goalFormCurrent").value) || 0;
  const targetDate = document.getElementById("goalFormDate").value;

  state.savingsGoals.push({
    id: "goal-" + Date.now(),
    name,
    targetAmount,
    currentAmount,
    targetDate,
    icon: "fa-bullseye",
    color: "emerald"
  });

  saveSavingsGoals();
  closeSavingsGoalModal();
  showToast("Target impian berhasil ditambahkan!", "success");
  renderSavingsGoals();
  renderDashboard();
}

function openDepositModal(goalId) {
  const goal = state.savingsGoals.find(g => g.id === goalId);
  if (!goal) return;

  document.getElementById("depositGoalId").value = goal.id;
  document.getElementById("depositGoalNameText").innerText = goal.name;
  document.getElementById("depositAmount").value = "";
  document.getElementById("addSavingsDepositModal").classList.remove("hidden");
}

function closeDepositModal() {
  document.getElementById("addSavingsDepositModal").classList.add("hidden");
}

function handleDepositSubmit(e) {
  e.preventDefault();
  const goalId = document.getElementById("depositGoalId").value;
  const amount = Number(document.getElementById("depositAmount").value) || 0;

  const goal = state.savingsGoals.find(g => g.id === goalId);
  if (goal) {
    goal.currentAmount += amount;
    saveSavingsGoals();
    closeDepositModal();
    showToast(`Setoran ${formatRupiah(amount)} berhasil ditambahkan ke ${goal.name}!`, "success");
    renderSavingsGoals();
    renderDashboard();
  }
}

function deleteSavingsGoal(id) {
  if (confirm("Hapus target impian ini?")) {
    state.savingsGoals = state.savingsGoals.filter(g => g.id !== id);
    saveSavingsGoals();
    renderSavingsGoals();
    renderDashboard();
    showToast("Target impian dihapus", "info");
  }
}

// ==========================================
// 13. ACCOUNTS / WALLETS MANAGEMENT
// ==========================================

function renderAccountsList() {
  const container = document.getElementById("accountsDetailedGrid");
  if (!container) return;

  container.innerHTML = state.accounts.map(acc => {
    const bal = calculateAccountBalance(acc.id);
    return `
      <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg">
              <i class="fa-solid ${acc.icon || 'fa-wallet'}"></i>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-xl text-slate-500">
              ${acc.type}
            </span>
          </div>

          <div class="mt-4">
            <h3 class="font-extrabold text-slate-900 dark:text-white text-base">${acc.name}</h3>
            <p class="text-xs text-slate-400 mt-0.5">Saldo Awal: ${formatRupiah(acc.initialBalance)}</p>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Saldo Saat Ini</span>
            <span class="text-lg font-black font-mono text-indigo-600 dark:text-indigo-400">${formatRupiah(bal)}</span>
          </div>
          <button onclick="deleteAccount('${acc.id}')" title="Hapus Akun" class="w-8 h-8 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors">
            <i class="fa-regular fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function openAccountModal() {
  document.getElementById("accountForm").reset();
  document.getElementById("accountFormId").value = "";
  document.getElementById("accountModal").classList.remove("hidden");
}

function closeAccountModal() {
  document.getElementById("accountModal").classList.add("hidden");
}

function handleAccountSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("accountFormName").value.trim();
  const type = document.getElementById("accountFormType").value;
  const initialBalance = Number(document.getElementById("accountFormBalance").value) || 0;

  const typeIcons = {
    bank: "fa-building-columns",
    ewallet: "fa-mobile-screen-button",
    cash: "fa-money-bill-wave",
    investment: "fa-chart-line"
  };

  const typeColors = {
    bank: "from-blue-600 to-indigo-700",
    ewallet: "from-cyan-600 to-teal-700",
    cash: "from-emerald-600 to-green-700",
    investment: "from-purple-600 to-indigo-800"
  };

  state.accounts.push({
    id: "acc-" + Date.now(),
    name,
    type,
    initialBalance,
    color: typeColors[type] || "from-slate-700 to-slate-900",
    icon: typeIcons[type] || "fa-wallet"
  });

  saveAccounts();
  closeAccountModal();
  showToast(`Akun ${name} berhasil ditambahkan!`, "success");

  renderDashboard();
  renderAccountsList();
}

function deleteAccount(id) {
  if (state.accounts.length <= 1) {
    showToast("Minimal harus memiliki 1 akun aktif!", "warning");
    return;
  }

  const acc = state.accounts.find(a => a.id === id);
  if (confirm(`Hapus akun "${acc.name}"? Catatan transaksi yang menggunakan akun ini mungkin terpengaruh.`)) {
    state.accounts = state.accounts.filter(a => a.id !== id);
    saveAccounts();
    renderDashboard();
    renderAccountsList();
    showToast("Akun telah dihapus", "info");
  }
}

// ==========================================
// 14. EXPORT CSV & DATA BACKUP
// ==========================================

function exportTransactionsCSV() {
  if (state.transactions.length === 0) {
    showToast("Tidak ada data transaksi untuk diekspor", "warning");
    return;
  }

  let csv = "ID,Tanggal,Tipe,Kategori,Akun,Akun_Tujuan,Nominal,Catatan,Tag\n";
  state.transactions.forEach(t => {
    const acc = state.accounts.find(a => a.id === t.accountId);
    const toAcc = t.toAccountId ? state.accounts.find(a => a.id === t.toAccountId) : null;
    csv += `"${t.id}","${t.date}","${t.type}","${t.category}","${acc?.name || ''}","${toAcc?.name || ''}",${t.amount},"${t.note || ''}","${t.tag || ''}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fintrack-transaksi-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("File CSV transaksi berhasil diunduh!", "success");
}

function backupAllFinanceData() {
  const fullBackup = {
    accounts: state.accounts,
    transactions: state.transactions,
    budgets: state.budgets,
    savingsGoals: state.savingsGoals,
    exportedAt: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `fintrack-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Cadangan file JSON berhasil diunduh!", "success");
}

function restoreFinanceData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.accounts && parsed.transactions) {
        state.accounts = parsed.accounts;
        state.transactions = parsed.transactions;
        state.budgets = parsed.budgets || [];
        state.savingsGoals = parsed.savingsGoals || [];

        saveAccounts();
        saveTransactions();
        saveBudgets();
        saveSavingsGoals();

        renderDashboard();
        showToast("Data keuangan berhasil dipulihkan dari cadangan!", "success");
      } else {
        showToast("Format file cadangan tidak valid", "error");
      }
    } catch (err) {
      showToast("Gagal memproses file JSON", "error");
    }
  };
  reader.readAsText(file);
}

function resetToSampleFinanceData() {
  if (confirm("Kembalikan data ke data sampel awal? Data perubahan Anda saat ini akan ditimpa.")) {
    state.accounts = [ ...DEFAULT_ACCOUNTS ];
    state.transactions = [ ...SAMPLE_TRANSACTIONS ];
    state.budgets = [ ...DEFAULT_BUDGETS ];
    state.savingsGoals = [ ...DEFAULT_SAVINGS_GOALS ];

    saveAccounts();
    saveTransactions();
    saveBudgets();
    saveSavingsGoals();

    renderDashboard();
    renderTransactionsTable();
    renderBudgets();
    renderSavingsGoals();
    renderAccountsList();
    showToast("Data sampel berhasil dimuat ulang", "info");
  }
}

// ==========================================
// 15. FITUR VOICE RECORDING (CATAT LEWAT SUARA PINTAR & SLANG INDONESIA)
// ==========================================

let speechRecognition = null;
let isVoiceListening = false;
let currentVoiceParsedResult = null;
let voiceAutoSaveTimer = null;
let voiceCountdownSeconds = 3;

// Audio Chime Synthesizer via Web Audio API (No external files needed)
function playVoiceChime(type = "listen") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "listen") {
      // Soft start double beep (440Hz -> 660Hz)
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === "success") {
      // Pleasant melodic chime (587Hz -> 880Hz)
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    // Ignore audio context errors if blocked by browser policy
  }
}

function checkSpeechRecognitionSupport() {
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

function openVoiceModal() {
  document.getElementById("voiceModal").classList.remove("hidden");
  resetVoiceModalUI();

  if (!checkSpeechRecognitionSupport()) {
    document.getElementById("voiceStatusText").innerText = "Browser belum mendukung Speech API. Gunakan Chrome, Edge, atau Safari di iOS/Android.";
    document.getElementById("voiceTranscriptText").innerText = "Perekaman suara tidak didukung browser ini.";
    return;
  }

  // Synchronous start to comply with iOS Safari user-gesture policy!
  startVoiceListening();
}

function closeVoiceModal() {
  stopVoiceListening();
  clearVoiceAutoSave();
  document.getElementById("voiceModal").classList.add("hidden");
}

function resetVoiceModalUI() {
  clearVoiceAutoSave();
  currentVoiceParsedResult = null;
  document.getElementById("voiceTranscriptText").innerText = "Mendengarkan... Silakan sebutkan pengeluaran Anda santai saja.";
  document.getElementById("voiceParsedResultContainer").classList.add("hidden");
  document.getElementById("voiceConfirmSaveBtn").disabled = true;
  document.getElementById("voiceEditManualBtn").classList.add("hidden");
  document.getElementById("voicePulseRings").classList.add("hidden");
  document.getElementById("voiceMicBtn").classList.remove("scale-110", "ring-4", "ring-violet-400");
}

function clearVoiceAutoSave() {
  if (voiceAutoSaveTimer) {
    clearInterval(voiceAutoSaveTimer);
    voiceAutoSaveTimer = null;
  }
}

function toggleVoiceListening() {
  if (isVoiceListening) {
    stopVoiceListening();
  } else {
    startVoiceListening();
  }
}

function startVoiceListening() {
  if (!checkSpeechRecognitionSupport()) {
    showToast("Browser tidak mendukung input suara", "error");
    return;
  }

  clearVoiceAutoSave();

  try {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRec();
    speechRecognition.lang = "id-ID";
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.maxAlternatives = 1;

    speechRecognition.onstart = () => {
      isVoiceListening = true;
      playVoiceChime("listen");
      document.getElementById("voiceStatusText").innerText = "Mendengarkan... Silakan bicara santai (contoh: 'kopi 25 rebu pakai tunai')";
      document.getElementById("voicePulseRings").classList.remove("hidden");
      document.getElementById("voiceMicBtn").classList.add("scale-110", "ring-4", "ring-violet-400");
    };

    speechRecognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const activeText = finalTranscript || interimTranscript;
      if (activeText) {
        document.getElementById("voiceTranscriptText").innerText = `"${activeText}"`;
        // Real-time live parsing: update UI immediately as the user is speaking!
        processVoiceTranscript(activeText, Boolean(finalTranscript));
      }
    };

    speechRecognition.onerror = (event) => {
      console.warn("Speech recognition notice:", event.error);
      isVoiceListening = false;
      document.getElementById("voicePulseRings").classList.add("hidden");
      document.getElementById("voiceMicBtn").classList.remove("scale-110", "ring-4", "ring-violet-400");

      if (event.error === "no-speech") {
        document.getElementById("voiceStatusText").innerText = "Tidak ada suara tertangkap. Tekan tombol 'Bicara Lagi' untuk mencoba kembali.";
      } else if (event.error === "not-allowed") {
        document.getElementById("voiceStatusText").innerText = "Izin mikrofon belum aktif. Mohon klik izinkan mikrofon di browser Anda.";
      } else {
        document.getElementById("voiceStatusText").innerText = `Selesai (${event.error}). Tekan tombol untuk bicara lagi.`;
      }
    };

    speechRecognition.onend = () => {
      isVoiceListening = false;
      document.getElementById("voicePulseRings").classList.add("hidden");
      document.getElementById("voiceMicBtn").classList.remove("scale-110", "ring-4", "ring-violet-400");
    };

    speechRecognition.start();
  } catch (err) {
    console.error("Gagal start speech:", err);
    isVoiceListening = false;
    document.getElementById("voiceStatusText").innerText = "Ketuk ikon mikrofon di atas untuk mulai berbicara.";
  }
}

function stopVoiceListening() {
  if (speechRecognition && isVoiceListening) {
    try {
      speechRecognition.stop();
    } catch (e) {}
  }
  isVoiceListening = false;
  document.getElementById("voicePulseRings").classList.add("hidden");
  document.getElementById("voiceMicBtn").classList.remove("scale-110", "ring-4", "ring-violet-400");
}

// -------------------------------------------------------------
// SUPER-RESILIENT INDONESIAN SPOKEN AMOUNT PARSER (SLANG & FORMAL)
// -------------------------------------------------------------

function parseIndonesianChunk(words) {
  let sum = 0;
  let temp = 0;
  const digits = {
    "nol": 0, "satu": 1, "se": 1, "dua": 2, "tiga": 3, "empat": 4,
    "lima": 5, "enam": 6, "tujuh": 7, "delapan": 8, "sembilan": 9
  };

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (w === "seratus") {
      sum += 100;
    } else if (w === "ratus") {
      sum += (temp || 1) * 100;
      temp = 0;
    } else if (w === "sepuluh") {
      sum += 10;
    } else if (w === "sebelas") {
      sum += 11;
    } else if (w === "belas") {
      sum += (temp || 0) + 10;
      temp = 0;
    } else if (w === "puluh") {
      sum += (temp || 1) * 10;
      temp = 0;
    } else if (digits[w] !== undefined) {
      temp = digits[w];
    } else if (/^\d+$/.test(w)) {
      temp = parseInt(w, 10);
    }
  }
  sum += temp;
  return sum;
}

function parseIndonesianAmount(rawText) {
  if (!rawText) return 0;
  let text = rawText.toLowerCase().trim();

  // 1. Normalize Indonesian Slang & Colloquialisms
  // "rebu", "rbu", "reboo", "rebo", "rb", "k" -> "ribu"
  text = text.replace(/(\d+)\s*k\b/gi, "$1 ribu");
  text = text.replace(/(\d+)\s*rb\b/gi, "$1 ribu");
  text = text.replace(/\b(rebu|rbu|reboo|rebo)\b/gi, "ribu");
  text = text.replace(/(\d+)\s*(rebu|rbu|reboo|rebo)\b/gi, "$1 ribu");
  text = text.replace(/\b(jeti|jetong|jt)\b/gi, "juta");
  text = text.replace(/(\d+)\s*(jeti|jetong|jt)\b/gi, "$1 juta");
  text = text.replace(/\bperak\b/gi, "");

  // 2. Hokkien / Indonesian Slang Monetary Terms
  if (/\bseceng\b/i.test(text)) return 1000;
  if (/\bnoceng\b/i.test(text)) return 2000;
  if (/\bgoceng\b/i.test(text)) return 5000;
  if (/\bceban\b/i.test(text)) return 10000;
  if (/\bno ceban\b/i.test(text) || /\bpeban\b/i.test(text)) return 20000;
  if (/\bgocap\b/i.test(text) || /\bgoban\b/i.test(text)) return 50000;
  if (/\bcepek ceng\b/i.test(text) || /\bcepek\b/i.test(text)) return 100000;
  if (/\bnopek ceng\b/i.test(text) || /\bnopek\b/i.test(text)) return 200000;
  if (/\bgopek ceng\b/i.test(text)) return 500000;
  if (/\bgopek\b/i.test(text)) return 500;

  // 3. Handle "setengah" patterns
  if (text.includes("setengah juta")) return 500000;
  if (text.includes("setengah rebu") || text.includes("setengah ribu")) return 500;
  
  const matchJutaSetengah = text.match(/(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)\s*juta\s*setengah/i);
  if (matchJutaSetengah) {
    const wordDigits = { "satu": 1, "dua": 2, "tiga": 3, "empat": 4, "lima": 5, "enam": 6, "tujuh": 7, "delapan": 8, "sembilan": 9, "sepuluh": 10 };
    const base = wordDigits[matchJutaSetengah[1]] || parseInt(matchJutaSetengah[1], 10) || 1;
    return (base * 1000000) + 500000;
  }

  if (/\bsejuta\b/i.test(text) && !text.includes("satu juta")) return 1000000;
  if (/\bseribu\b/i.test(text) && !text.includes("satu ribu") && !text.includes("seratus")) return 1000;

  // 4. Handle Numeric + Juta (e.g. "1,5 juta", "1.5 juta", "2 juta", "10 juta")
  const matchNumJuta = text.match(/([\d\.,]+)\s*juta/i);
  if (matchNumJuta) {
    const cleanNum = matchNumJuta[1].replace(/\./g, "").replace(",", ".");
    const val = parseFloat(cleanNum);
    if (!isNaN(val)) return Math.round(val * 1000000);
  }

  // 5. Handle Numeric + Ribu (e.g. "25 ribu", "150 ribu", "25ribu")
  const matchNumRibu = text.match(/([\d\.,]+)\s*ribu/i);
  if (matchNumRibu) {
    const cleanNum = matchNumRibu[1].replace(/\./g, "").replace(",", ".");
    const val = parseFloat(cleanNum);
    if (!isNaN(val)) {
      if (val >= 1000) return Math.round(val);
      return Math.round(val * 1000);
    }
  }

  // 6. Comprehensive Word-to-Number Parsing
  // Handles: "dua puluh lima ribu", "tiga puluh lima ribu lima ratus", "tiga ratus lima puluh ribu", "seratus lima puluh ribu"
  const tokens = text.split(/\s+/);
  let totalFromWords = 0;
  let currentChunk = [];
  const recognizedWordUnits = ["nol","satu","se","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas","belas","puluh","seratus","ratus"];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "juta") {
      const chunkVal = parseIndonesianChunk(currentChunk) || 1;
      totalFromWords += chunkVal * 1000000;
      currentChunk = [];
    } else if (t === "ribu") {
      const chunkVal = parseIndonesianChunk(currentChunk) || 1;
      totalFromWords += chunkVal * 1000;
      currentChunk = [];
    } else if (recognizedWordUnits.includes(t) || /^\d+$/.test(t)) {
      currentChunk.push(t);
    }
  }

  if (currentChunk.length > 0) {
    const remainder = parseIndonesianChunk(currentChunk);
    if (totalFromWords > 0) {
      totalFromWords += remainder;
    } else if (remainder >= 1000) {
      totalFromWords = remainder;
    }
  }

  if (totalFromWords > 0) return totalFromWords;

  // 7. Look for standalone numbers with Indonesian format: "25.000", "50.000", "150.000"
  const matchDotFormatted = text.match(/\b\d{1,3}(\.\d{3})+\b/);
  if (matchDotFormatted) {
    const val = parseInt(matchDotFormatted[0].replace(/\./g, ""), 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 8. Look for standalone 4 to 9 digits: "25000", "50000", "150000"
  const matchRawDigits = text.match(/\b\d{4,9}\b/);
  if (matchRawDigits) {
    const val = parseInt(matchRawDigits[0], 10);
    if (!isNaN(val) && val > 0) return val;
  }

  return 0;
}

// -------------------------------------------------------------
// INTELLIGENT NATURAL LANGUAGE INTENT & CATEGORY PARSER
// -------------------------------------------------------------

function parseIndonesianVoiceText(transcript) {
  const text = transcript.toLowerCase().trim();

  // 1. Type Detection: Income vs Expense
  const isIncome = /\b(gaji|pemasukan|masuk|dapat uang|dapet uang|penjualan|cuan|terima|bonus|thr|hasil|hadiah|dikasih|menang|honor|gajian)\b/i.test(text);
  const type = isIncome ? "income" : "expense";

  // 2. Amount Detection
  const amount = parseIndonesianAmount(text);

  // 3. Category Detection with Broad Colloquial Mapping
  let category = type === "income" ? "Gaji Utama" : "Makanan & Minuman";

  if (type === "expense") {
    if (/\b(makan|minum|kopi|ngopi|cafe|kafe|resto|warteg|kantin|sarapan|siang|malam|jajan|snack|cemilan|teh|burger|nasi|mie|bakso|baso|sate|pizza|ayam|bebek|soto|martabak|cilok|seblak|es|jus|boba|indomie|kue|roti|lapar|haus)\b/i.test(text)) {
      category = "Makanan & Minuman";
    } else if (/\b(bensin|pertalite|pertamax|bbm|solar|parkir|ojek|gojek|gocar|grab|maxim|taksi|toll|etoll|e-toll|bus|kereta|krl|mrt|servis|service|bengkel|ban|helm|cuci motor|cuci mobil|tiket pesawat|tiket)\b/i.test(text)) {
      category = "Transportasi";
    } else if (/\b(belanja|minimarket|supermarket|indomaret|alfamart|sabun|odol|deterjen|sampo|baju|celana|sepatu|tas|kaos|pakaian|pasar|beras|telur|minyak|beli barang|tokopedia|shopee|lazada|toko)\b/i.test(text)) {
      category = "Belanja Kebutuhan";
    } else if (/\b(listrik|pln|air|pdam|wifi|internet|indihome|biznet|pulsa|kuota|paket data|bpjs|pbb|sewa|kontrakan|kos|kost|tagihan|iuran)\b/i.test(text)) {
      category = "Tagihan & Utilitas";
    } else if (/\b(nonton|bioskop|movie|cinema|xxi|film|game|steam|topup game|diamond|netflix|spotify|youtube|liburan|jalan|wisata|hotel|karaoke|hangout|nongkrong|hiburan)\b/i.test(text)) {
      category = "Hiburan & Rekreasi";
    } else if (/\b(obat|apotek|dokter|rumah sakit|rs|vitamin|klinik|periksa|gigi|vaksin|pcr|sehat|medis|flu|batuk)\b/i.test(text)) {
      category = "Kesehatan";
    } else if (/\b(buku|les|kursus|spp|kuliah|sekolah|ujian|seminar|skripsi|fotokopi)\b/i.test(text)) {
      category = "Pendidikan";
    } else if (/\b(cicilan|hutang|utang|paylater|spaylater|kartu kredit|pinjaman|pinjol|kpr)\b/i.test(text)) {
      category = "Cicilan & Utang";
    }
  } else {
    if (/\b(gaji|bulanan|kantor|gajian)\b/i.test(text)) {
      category = "Gaji Utama";
    } else if (/\b(bonus|thr|insentif|komisi)\b/i.test(text)) {
      category = "Bonus & THR";
    } else if (/\b(freelance|proyek|sampingan|usaha|jualan|dagang|klien|toko)\b/i.test(text)) {
      category = "Usaha Sampingan";
    } else if (/\b(investasi|reksadana|saham|crypto|dividen|bunga)\b/i.test(text)) {
      category = "Hasil Investasi";
    } else if (/\b(hadiah|cashback|giveaway|menang|dikasih|angpao)\b/i.test(text)) {
      category = "Hadiah / Cashback";
    }
  }

  // 4. Account Matching
  let targetAccount = state.accounts[0];
  const foundAccount = state.accounts.find(a => {
    const accName = a.name.toLowerCase();
    if (text.includes("bca") && accName.includes("bca")) return true;
    if (text.includes("mandiri") && accName.includes("mandiri")) return true;
    if ((text.includes("gopay") || text.includes("ovo") || text.includes("dana") || text.includes("shopeepay")) && (accName.includes("gopay") || a.type === "ewallet")) return true;
    if ((text.includes("tunai") || text.includes("cash") || text.includes("dompet") || text.includes("uang fisik")) && (a.type === "cash" || accName.includes("tunai"))) return true;
    if ((text.includes("bibit") || text.includes("investasi") || text.includes("reksadana")) && (a.type === "investment" || accName.includes("bibit"))) return true;
    return false;
  });

  if (foundAccount) {
    targetAccount = foundAccount;
  } else {
    // For general small daily expense (<= 100k), prefer Cash wallet
    const cashAcc = state.accounts.find(a => a.type === "cash");
    if (cashAcc && type === "expense" && amount <= 100000) {
      targetAccount = cashAcc;
    }
  }

  // 5. Clean Note Extraction
  let cleanNote = transcript
    .replace(/\b(tolong|catatkan|catat|pengeluaran|pemasukan|sebesar|seharga|nominal|rupiah|ribu|juta|jt|rb|k|rebu|rbu|jeti|perak|pakai|pake|dari|ke|lewat|akun|bca|mandiri|gopay|ovo|dana|tunai|cash|tadi|kemarin|abis|habis|buat|beli|bayar)\b/gi, "")
    .replace(/\b(seceng|noceng|goceng|ceban|gocap|goban|cepek|nopek|gopek)\b/gi, "")
    .replace(/\b(nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|sebelas|belas|puluh|seratus|ratus|seribu|sejuta)\b/gi, "")
    .replace(/\b\d+(\.\d{3})*(\,\d+)?\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // If clean note is still empty or too short, construct an intuitive description
  if (!cleanNote || cleanNote.length < 3) {
    cleanNote = `${category}`;
  } else {
    cleanNote = cleanNote.charAt(0).toUpperCase() + cleanNote.slice(1);
  }

  return {
    type,
    amount,
    category,
    accountId: targetAccount.id,
    accountName: targetAccount.name,
    note: cleanNote
  };
}

function processVoiceTranscript(transcript, isFinal = false) {
  const parsed = parseIndonesianVoiceText(transcript);
  currentVoiceParsedResult = parsed;

  const resultContainer = document.getElementById("voiceParsedResultContainer");
  const statusText = document.getElementById("voiceStatusText");
  const saveBtn = document.getElementById("voiceConfirmSaveBtn");
  const editManualBtn = document.getElementById("voiceEditManualBtn");

  resultContainer.classList.remove("hidden");
  editManualBtn.classList.remove("hidden");

  // Populate preview card in real-time
  const typeBadge = document.getElementById("voiceParsedTypeBadge");
  if (parsed.type === "income") {
    typeBadge.className = "px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300";
    typeBadge.innerText = "Pemasukan";
  } else {
    typeBadge.className = "px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300";
    typeBadge.innerText = "Pengeluaran";
  }

  document.getElementById("voiceParsedAmount").innerText = formatRupiah(parsed.amount);
  document.getElementById("voiceParsedCategory").innerText = parsed.category;
  document.getElementById("voiceParsedAccount").innerText = parsed.accountName;
  document.getElementById("voiceParsedNote").innerText = parsed.note;

  if (parsed.amount > 0) {
    if (isFinal) {
      playVoiceChime("success");
      statusText.innerText = "Selesai! Nominal terdeteksi tepat. Tekan 'Simpan Transaksi'.";
    } else {
      statusText.innerText = "Nominal terdeteksi secara realtime! Teruskan bicara atau simpan.";
    }
    saveBtn.disabled = false;
  } else {
    statusText.innerText = "Nominal belum terbaca jelas. Coba sebutkan nominalnya, misal: 'kopi 25 rebu'.";
    saveBtn.disabled = true;
  }
}

function confirmSaveVoiceTransaction() {
  clearVoiceAutoSave();

  if (!currentVoiceParsedResult || currentVoiceParsedResult.amount <= 0) {
    showToast("Nominal transaksi tidak valid. Silakan sebutkan nominal uang.", "error");
    return;
  }

  const { type, amount, category, accountId, note } = currentVoiceParsedResult;

  const newTrx = {
    id: "trx-voice-" + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    type,
    accountId,
    category,
    amount,
    note,
    tag: "#voice"
  };

  state.transactions.unshift(newTrx);
  saveTransactions();

  closeVoiceModal();
  showToast(`Tersimpan: ${formatRupiah(amount)} (${note})`, "success");

  // Re-render views
  renderDashboard();
  renderTransactionsTable();
  renderBudgets();
}

function editVoiceResultManually() {
  clearVoiceAutoSave();
  if (!currentVoiceParsedResult) return;
  const parsed = currentVoiceParsedResult;
  closeVoiceModal();

  // Open standard transaction modal pre-filled
  openTransactionModal();
  setTransactionType(parsed.type);

  document.getElementById("trxFormAmount").value = parsed.amount || "";
  document.getElementById("trxFormCategory").value = parsed.category;
  document.getElementById("trxFormAccount").value = parsed.accountId;
  document.getElementById("trxFormNote").value = parsed.note;
  document.getElementById("trxFormTag").value = "#voice";
}

// ==========================================
// 16. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  renderDashboard();
});
