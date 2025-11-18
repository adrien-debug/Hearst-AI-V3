// Dashboard View Template - HEARST STYLE
// Basé sur le design de la capture d'écran
import { Icons } from '../icons.js';

export function renderDashboard(data) {
    return `
        <div class="dashboard-view">
            <div class="dashboard-content">
                <!-- Section Wallet -->
                <div class="wallet-section">
                    <div class="section-header-home">
                        <button class="btn btn-primary btn-transaction-history" id="btn-transaction-history">
                            Transaction history
                        </button>
                    </div>

                    <!-- BTC Wallet Card -->
                    <div class="wallet-card">
                        <div class="wallet-card-header">
                            <h3 class="wallet-card-title">BTC Wallet</h3>
                        </div>
                        <div class="wallet-card-body">
                            <div class="wallet-balance">
                                <div class="wallet-balance-btc">0.031819 BTC</div>
                                <div class="wallet-balance-usd">$3,628.13 USD</div>
                            </div>
                            <div class="wallet-address">
                                <span class="wallet-address-text">1Lzu8ieZUN7QDk6MTiPive2s2uhr2xzqqpck</span>
                                <button class="wallet-address-copy" onclick="copyWalletAddress()" title="Copy address">
                                    ${Icons.copy || '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><rect x="5" y="5" width="10" height="10" rx="1"/><path d="M3 3h8v8"/></svg>'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Wallet Incoming Transactions -->
                    <div class="transactions-section">
                        <div class="section-header-home">
                            <h3 class="section-title-home">Wallet incoming transactions</h3>
                            <div class="section-header-labels">
                                <span class="header-label">Date</span>
                                <span class="header-label">BTC Transaction</span>
                            </div>
                        </div>
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>BTC Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2025-07-09</td>
                                        <td class="transaction-amount">0.005650 BTC</td>
                                    </tr>
                                    <tr>
                                        <td>2025-07-09</td>
                                        <td class="transaction-amount">0.005650 BTC</td>
                                    </tr>
                                    <tr>
                                        <td>2025-07-09</td>
                                        <td class="transaction-amount">0.005650 BTC</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Section Transaction History -->
                <div class="transaction-history-section">
                    <div class="transaction-history-header">
                        <h2 class="transaction-history-title">Transaction history</h2>
                        <div class="transaction-history-controls">
                            <select class="date-range-select" id="date-range-select">
                                <option value="June 1, 2025 - June 30, 2025">June 1, 2025 - June 30, 2025</option>
                                <option value="May 1, 2025 - May 31, 2025">May 1, 2025 - May 31, 2025</option>
                                <option value="April 1, 2025 - April 30, 2025">April 1, 2025 - April 30, 2025</option>
                            </select>
                            <select class="contract-select" id="contract-select">
                                <option value="Contracts AL01">Contracts AL01</option>
                                <option value="Contracts AL02">Contracts AL02</option>
                                <option value="Contracts AL03">Contracts AL03</option>
                            </select>
                            <button class="btn btn-primary btn-export-excel" id="btn-export-excel">
                                Export to excel
                            </button>
                        </div>
                    </div>

                    <!-- Transaction History Table -->
                    <div class="table-container transaction-history-table-container">
                        <table class="table transaction-history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Account</th>
                                    <th>Amount</th>
                                    <th>Total Reward</th>
                                    <th>Hashrate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2025-06-30</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                                <tr>
                                    <td>2025-06-29</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                                <tr>
                                    <td>2025-06-28</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                                <tr>
                                    <td>2025-06-27</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                                <tr>
                                    <td>2025-06-26</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                                <tr>
                                    <td>2025-06-25</td>
                                    <td>AKT04</td>
                                    <td class="transaction-amount">0.021144 BTC</td>
                                    <td class="transaction-reward">0.082848 BTC</td>
                                    <td>2041.42 TH/s</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Total Row -->
                    <div class="transaction-history-total">
                        <strong>Total: <span class="total-amount">2.026587 BTC</span></strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add custom styles for dashboard - HEARST THEME
const dashboardStyles = `
<style>
.dashboard-view {
    padding: var(--space-12);
    width: 100%;
    max-width: 100%;
    margin: 0;
}

.dashboard-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
}

/* Section Headers */
.section-header-home {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
    gap: var(--space-4);
}

.page-title-home {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-2) 0;
    line-height: 1.3;
}

.page-subtitle {
    font-size: var(--text-base);
    color: var(--text-secondary);
    margin: 0;
}

.section-title-home {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.4;
}

/* Wallet Section */
.wallet-section {
    margin-bottom: var(--space-12);
}

.wallet-section .section-header-home {
    padding-left: var(--space-10);
}

.wallet-card {
    background: var(--primary-grey);
    border: var(--border-thin) solid var(--grey-100);
    border-radius: var(--radius-lg);
    padding: var(--space-10);
    margin-bottom: var(--space-8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(138, 253, 129, 0.05);
    transition: all var(--duration-normal) var(--ease-in-out);
}

.wallet-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(138, 253, 129, 0.1);
    transform: translateY(-2px);
}

.wallet-card-header {
    margin-bottom: var(--space-8);
}

.wallet-card-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.wallet-card-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
}

.wallet-balance {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.wallet-balance-btc {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--primary-green);
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-shadow: 0 0 20px rgba(138, 253, 129, 0.3);
}

.wallet-balance-usd {
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
}

.wallet-address {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: rgba(10, 10, 10, 0.6);
    border: var(--border-thin) solid var(--grey-100);
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    backdrop-filter: blur(10px);
    transition: all var(--duration-fast) var(--ease-in-out);
}

.wallet-address:hover {
    border-color: rgba(138, 253, 129, 0.3);
    background: rgba(10, 10, 10, 0.8);
}

.wallet-address-text {
    flex: 1;
    word-break: break-all;
}

.wallet-address-copy {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--space-1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: all var(--duration-fast) var(--ease-in-out);
}

.wallet-address-copy:hover {
    background: rgba(138, 253, 129, 0.1);
    color: var(--primary-green);
    box-shadow: 0 0 12px rgba(138, 253, 129, 0.2);
}

.wallet-address-copy svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
}

/* Transactions Section */
.transactions-section {
    margin-top: var(--space-8);
}

.transaction-amount {
    color: var(--primary-green);
    font-weight: var(--font-semibold);
    font-family: var(--font-mono);
    text-shadow: 0 0 10px rgba(138, 253, 129, 0.2);
}

/* Transaction History Section */
.transaction-history-section {
    margin-top: var(--space-12);
}

.transaction-history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
    gap: var(--space-8);
    flex-wrap: wrap;
}

.transaction-history-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    white-space: nowrap;
}

.transaction-history-controls {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
}

/* Assurer que les styles des selects sont appliqués */
.transaction-history-controls .date-range-select,
.transaction-history-controls .contract-select {
    padding: 10px 14px;
    background: var(--primary-grey);
    border: 1px solid var(--grey-100);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
    font-family: var(--font-primary);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-in-out);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23cccccc' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
}

.transaction-history-controls .date-range-select {
    min-width: 280px;
}

.transaction-history-controls .contract-select {
    min-width: 200px;
}

.date-range-select,
.contract-select {
    padding: 10px 14px;
    background: var(--primary-grey);
    border: 1px solid var(--grey-100);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
    font-family: var(--font-primary);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-in-out);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23cccccc' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
    min-width: 200px;
}

.date-range-select {
    min-width: 280px;
}

.date-range-select:hover,
.contract-select:hover {
    border-color: var(--grey-200);
}

.date-range-select:focus,
.contract-select:focus {
    outline: none;
    border-color: var(--primary-green);
    box-shadow: 0 0 0 1px rgba(138, 253, 129, 0.2);
}

.date-range-select option,
.contract-select option {
    background: var(--primary-grey);
    color: var(--text-primary);
    padding: 8px;
}

.btn-export-excel {
    white-space: nowrap;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    background-color: var(--primary-green);
    color: #000000;
    border: none;
    transition: all var(--duration-fast) var(--ease-in-out);
}

.btn-export-excel:hover {
    background-color: #75fc6c;
    box-shadow: 0 0 20px rgba(138, 253, 129, 0.3);
    transform: translateY(-1px);
}

.btn-export-excel:active {
    background-color: #75fc6c;
    transform: translateY(0);
}

/* Transaction History Table */
.transaction-history-table-container {
    background: var(--primary-grey);
    border: 1px solid var(--grey-100);
    border-radius: 12px;
    overflow: hidden;
}

.transaction-history-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
}

.transaction-history-table thead tr {
    background: #454646;
}

.transaction-history-table thead th {
    padding: 12px 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-primary);
    border-bottom: 1px solid var(--grey-100);
}

.transaction-history-table tbody tr {
    transition: background-color var(--duration-fast) var(--ease-in-out);
}

.transaction-history-table tbody tr:hover {
    background-color: rgba(138, 253, 129, 0.05);
}

.transaction-history-table tbody td {
    padding: 12px 16px;
    font-size: 14px;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--grey-100);
}

.transaction-amount,
.transaction-reward {
    color: var(--primary-green);
    font-weight: 500;
}

.transaction-history-total {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-4);
    padding-right: var(--space-4);
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
}

.transaction-history-total .total-amount {
    color: var(--primary-green);
    margin-left: var(--space-2);
}

/* Button Transaction History - Premium Style */
.btn.btn-transaction-history,
button.btn-transaction-history {
    background-color: #8AFD81 !important;
    color: #000 !important;
    border-radius: 30px !important;
    font-weight: 600 !important;
    padding: 10px 24px !important;
    transition: all 0.25s ease-in-out !important;
    border: none !important;
}

.btn.btn-transaction-history:hover,
button.btn-transaction-history:hover,
.btn.btn-transaction-history:active,
button.btn-transaction-history:active {
    background-color: #70D467 !important;
    box-shadow: 0 0 12px rgba(138, 253, 129, 0.55) !important;
    transform: translateY(-1px) !important;
    color: #000 !important;
}

/* Responsive */
@media (max-width: 1024px) {
    .dashboard-view {
        padding: var(--space-6);
    }
    
    .section-header-home {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .transaction-history-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
    }
    
    .transaction-history-controls {
        width: 100%;
    }
    
    .date-range-select,
    .contract-select {
        flex: 1;
        min-width: 200px;
    }
}

@media (max-width: 768px) {
    .wallet-balance-btc {
        font-size: var(--text-3xl);
    }
    
    .transaction-history-header {
        flex-direction: column;
        align-items: stretch;
    }
    
    .transaction-history-controls {
        flex-direction: column;
        width: 100%;
    }
    
    .date-range-select,
    .contract-select {
        width: 100%;
        min-width: unset;
    }
    
    .transaction-history-table {
        font-size: 12px;
    }
    
    .transaction-history-table thead th,
    .transaction-history-table tbody td {
        padding: 8px 12px;
    }
}
</style>
`;

// Fonction pour copier l'adresse du wallet
window.copyWalletAddress = function() {
    const address = '1Lzu8ieZUN7QDk6MTiPive2s2uhr2xzqqpck';
    navigator.clipboard.writeText(address).then(() => {
        // Optionnel: afficher une notification
        console.log('Address copied to clipboard');
    });
};

export const dashboardTemplate = renderDashboard;
export { dashboardStyles };
