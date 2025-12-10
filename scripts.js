document.addEventListener('DOMContentLoaded', () => {
	const navLinkItems = document.querySelectorAll('.nav-link');

	// Mobile nav toggle
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
});
