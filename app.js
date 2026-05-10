document.addEventListener('DOMContentLoaded', () => {
    initCart();
    initParticles();
    initAuthRedirects();
    initMobileMenu();
});

/**
 * Cart Logic
 */
function initCart() {
    // Initial Data
    if (!localStorage.getItem('diz_tips')) {
        const initialTips = [
            {
                id: 1,
                title: "Real Madrid vs Man City",
                content: "Over 2.5 goals looking extremely likely here. Both sides with massive attacking threat. 3 units advised. #ChampionsLeague",
                sport: "Football",
                stake: 3,
                tiers: ["Premium", "VIP"],
                views: 4200,
                likes: 124,
                comments: 45,
                time: "12:00"
            },
            {
                id: 2,
                title: "Grand National Selections",
                content: "I'm looking at 'The Wizard of Eye' at 20/1 for an Each Way play. Value is too high to ignore. 1 unit E/W. 🐎",
                sport: "Racing",
                stake: 2,
                tiers: ["VIP"],
                views: 8900,
                likes: 342,
                comments: 89,
                time: "14:30"
            }
        ];
        localStorage.setItem('diz_tips', JSON.stringify(initialTips));
    }

    /* 
 * Member Lifecycle Management
 */
function initUserData() {
    if (!localStorage.getItem('diz_users')) {
        const demoUsers = [
            { id: 1, name: "John Doe", email: "john@example.com", tier: "VIP", status: "ACTIVE", joined: "2026-05-10" },
            { id: 2, name: "Sarah Smith", email: "sarah@tips.com", tier: "GOLD", status: "ACTIVE", joined: "2026-05-09" }
        ];
        localStorage.setItem('diz_users', JSON.stringify(demoUsers));
    }
}

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('diz_users') || '[]');
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        tier: "NONE",
        status: "INACTIVE",
        joined: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    localStorage.setItem('diz_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html';
}

function upgradeUser(tier) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    user.tier = tier;
    user.status = "ACTIVE";
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update master list
    const users = JSON.parse(localStorage.getItem('diz_users'));
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
        users[idx] = user;
        localStorage.setItem('diz_users', JSON.stringify(users));
    }
}

function checkGating() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const dashContent = document.getElementById('dash-main-content');
    const lockOverlay = document.getElementById('lock-overlay');
    
    // Admin always has full access
    if (isAdmin) {
        if (dashContent) dashContent.classList.remove('dashboard-locked');
        if (lockOverlay) lockOverlay.classList.add('hidden');
        if (document.getElementById('user-tier-badge')) {
            document.getElementById('user-tier-badge').innerText = "DIZ ADMIN";
            document.getElementById('user-tier-badge').className = "badge-vip";
        }
        return;
    }
    
    if (!user || user.tier === "NONE") {
        if (dashContent) dashContent.classList.add('dashboard-locked');
        if (lockOverlay) lockOverlay.classList.remove('hidden');
    } else {
        if (dashContent) dashContent.classList.remove('dashboard-locked');
        if (lockOverlay) lockOverlay.classList.add('hidden');
        if (document.getElementById('user-tier-badge')) {
            document.getElementById('user-tier-badge').innerText = user.tier + " MEMBER";
            document.getElementById('user-tier-badge').className = `badge-${user.tier.toLowerCase()}`;
        }
    }
}

    // Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.onclick = function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('Menu Toggled:', navLinks.classList.contains('active'));
        };
        
        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.onclick = function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            };
        });
    }
}

// Master Key Logic
    function checkAdminStatus() {
        return localStorage.getItem('isAdmin') === 'true';
    }

    // Moderation Actions
    function deleteTip(id) {
        if (!checkAdminStatus()) return;
        let tips = JSON.parse(localStorage.getItem('diz_tips') || '[]');
        tips = tips.filter(t => t.id !== id);
        localStorage.setItem('diz_tips', JSON.stringify(tips));
        location.reload();
    }

    function pinMessage(id) {
        if (!checkAdminStatus()) return;
        // Pin logic here
        alert('Message Pinned to Top');
    }

    // Update renderTips to show more detail
    function renderTips() {
        const feed = document.getElementById('tips-feed');
        if (!feed) return;
        const tips = JSON.parse(localStorage.getItem('diz_tips') || '[]');
        const isAdmin = checkAdminStatus();
        
        feed.innerHTML = tips.length ? '' : '<p class="text-center">No tips broadcasted yet.</p>';
        
        tips.forEach(tip => {
            const card = document.createElement('div');
            card.className = 'tip-card';
            card.innerHTML = `
                <div class="tip-header">
                    <div>
                        <span class="badge-vip badge-gold" style="margin-right: 0.5rem;">${tip.sport}</span>
                        <span class="message-time">${tip.time}</span>
                    </div>
                    <div class="tip-badge badge-vip">${tip.tiers.join(', ')}</div>
                </div>
                <h3 class="mb-l">${tip.title}</h3>
                <div class="tip-content">
                    ${tip.content}
                    <div class="odds-display mt-l" style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 4px; display: flex; gap: 2rem;">
                        <div><small>Decimal</small><br><strong class="gold-text">${tip.decimal || '-'}</strong></div>
                        <div><small>Fractional</small><br><strong class="gold-text">${tip.fraction || '-'}</strong></div>
                        <div><small>Stake</small><br><strong class="gold-text">${tip.stake}u</strong></div>
                    </div>
                </div>
                <div class="tip-meta">
                    <span>👁️ ${tip.views + Math.floor(Math.random()*100)}</span>
                    <span>❤️ ${tip.likes + Math.floor(Math.random()*50)}</span>
                    <span>💬 ${tip.comments + Math.floor(Math.random()*20)}</span>
                </div>
                <div class="tip-actions">
                    <button class="btn-primary-gold" onclick="acceptTip(${tip.id}, ${tip.stake})" style="padding: 0.5rem 1rem; font-size: 0.7rem;">ACCEPT TIP</button>
                    ${isAdmin ? `<button class="btn-mod" onclick="deleteTip(${tip.id})">DELETE TIP (ADMIN)</button>` : ''}
                </div>
            `;
            feed.appendChild(card);
        });
    }

    // Authentication Wrappers
    function loginUser() {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    }

    function loginAdmin() {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin-dash.html';
    }

    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const addBtns = document.querySelectorAll('.btn-add-cart');
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartDisplay();

    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const price = btn.dataset.price;
            
            // For memberships, we usually only want one in the cart
            cart = [{ id, price }];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            
            // Direct redirect to checkout for a "modern" seamless flow
            window.location.href = 'checkout.html';
        });
    });

    function updateCartDisplay() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
}

/**
 * Mock Auth Redirects
 */
function initAuthRedirects() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Default to premium dash for mock
            window.location.href = 'dashboard.html?tier=premium';
        });
    }
}

/**
 * Particles Background
 */
function initParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    const count = 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.3});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${Math.random() * 20 + 10}s infinite linear alternate;
        `;
        container.appendChild(p);
    }

    if (!document.getElementById('particle-anim')) {
        const style = document.createElement('style');
        style.id = 'particle-anim';
        style.innerHTML = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            }
        `;
        document.head.appendChild(style);
    }
}
