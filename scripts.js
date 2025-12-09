document.addEventListener('DOMContentLoaded', () => {
	const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
	const dropdownMenu = document.querySelector('.dropdown-menu');
	const navLinkItems = document.querySelectorAll('.nav-link');

	// Dropdown toggle behavior
	if (dropdownToggle && dropdownMenu) {
		const setExpanded = (value) => dropdownToggle.setAttribute('aria-expanded', String(value));

		dropdownToggle.addEventListener('click', (e) => {
			const isOpen = dropdownMenu.classList.toggle('show');
			setExpanded(isOpen);
			if (isOpen) dropdownMenu.querySelector('a')?.focus();
		});

		// Close on outside click
		document.addEventListener('click', (e) => {
			if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target) && dropdownMenu.classList.contains('show')) {
				dropdownMenu.classList.remove('show');
				setExpanded(false);
			}
		});

		// Close on Escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && dropdownMenu.classList.contains('show')) {
				dropdownMenu.classList.remove('show');
				setExpanded(false);
				dropdownToggle.focus();
			}
		});
	}

	// Close dropdown when a nav link is clicked (useful for mobile)
	navLinkItems.forEach((link) => {
		link.addEventListener('click', () => {
			if (dropdownMenu && dropdownMenu.classList.contains('show')) {
				dropdownMenu.classList.remove('show');
				dropdownToggle && dropdownToggle.setAttribute('aria-expanded', 'false');
			}
		});
	});

	// Mobile nav toggle (fallback) - supports .nav-toggle and #primary-navigation
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.getElementById('primary-navigation');
	if (navToggle && navLinks) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			navLinks.classList.toggle('show');
		});

		// Close menu on Escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && navLinks.classList.contains('show')) {
				navLinks.classList.remove('show');
				navToggle.setAttribute('aria-expanded', 'false');
				navToggle.focus();
			}
		});

		// Close when clicking a nav link
		navLinkItems.forEach((link) => {
			link.addEventListener('click', () => {
				if (navLinks.classList.contains('show')) {
					navLinks.classList.remove('show');
					navToggle.setAttribute('aria-expanded', 'false');
				}
			});
		});
	}

	// Highlight nav link for visible section using IntersectionObserver
	const sections = Array.from(document.querySelectorAll('main section[id]'));
	const observerOptions = { root: null, rootMargin: '-35% 0px -40% 0px', threshold: 0 };

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const id = entry.target.getAttribute('id');
			const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
			if (entry.isIntersecting) {
				document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
				if (matchingLink) matchingLink.classList.add('active');
			}
		});
	}, observerOptions);

	sections.forEach(section => observer.observe(section));

	// Contact panel toggle (sideways dropdown)
	const contactToggle = document.querySelector('.contact-toggle');
	const contactPanel = document.querySelector('.contact-panel');
	const contactBody = document.getElementById('contact-body');
	if (contactToggle && contactPanel && contactBody) {
		contactToggle.addEventListener('click', (e) => {
			const isOpen = contactPanel.classList.toggle('open');
			contactToggle.setAttribute('aria-expanded', String(isOpen));
			if (isOpen) {
				contactBody.hidden = false;
			} else {
				contactBody.hidden = true;
			}
		});

		// Close contact panel on Escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && contactPanel.classList.contains('open')) {
				contactPanel.classList.remove('open');
				contactToggle.setAttribute('aria-expanded', 'false');
				contactBody.hidden = true;
				contactToggle.focus();
			}
		});
	}
});
