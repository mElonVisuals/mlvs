/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
				'2xl': '1536px', // Increased for larger screens
			},
		},
		extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Aldrich"', '"Orbitron"', 'monospace'], // Cyberpunk/GTA RP style fonts
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        'neon-pink': 'hsl(var(--primary))', // Kept for potential specific use
        'neon-cyan': 'hsl(var(--secondary))', // Kept for potential specific use
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0px' }, /* Changed from 0 to 0px */
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0px' }, /* Changed from 0 to 0px */
				},
        'glitch-effect': { /* Renamed for clarity */
          '0%, 100%': { transform: 'translate(0, 0) skew(0deg)', opacity: 1 },
          '10%': { transform: 'translate(-2px, 1px) skew(-1deg)', opacity: 0.8 },
          '20%': { transform: 'translate(1px, -1px) skew(1deg)', opacity: 1 },
          '30%': { transform: 'translate(2px, 2px) skew(0.5deg)', opacity: 0.7 },
          '40%': { transform: 'translate(-1px, -2px) skew(-0.5deg)', opacity: 1 },
          '50%': { transform: 'translate(0, 1px) skew(0deg)', opacity: 0.9 },
          '60%': { transform: 'translate(1px, 0) skew(1deg)', opacity: 1 },
          '70%': { transform: 'translate(-2px, 1px) skew(-1deg)', opacity: 0.8 },
          '80%': { transform: 'translate(0, -1px) skew(0.5deg)', opacity: 1 },
          '90%': { transform: 'translate(1px, 2px) skew(-0.5deg)', opacity: 0.7 },
        },
        'text-flicker': { /* More pronounced flicker */
          '0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100%': {
            opacity: 0.99,
            textShadow:
              '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.7), 0 0 20px hsl(var(--primary) / 0.7), 0 0 25px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3), 0 0 35px hsl(var(--primary) / 0.2)',
          },
          '20%, 21.9%, 63%, 63.9%, 65%, 69.9%': {
            opacity: 0.4,
            textShadow: 'none',
          },
        },
        'circuit-flow': { /* For background elements */
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' }, /* Adjust for desired speed/distance */
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch': 'glitch-effect 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        'neon-flicker': 'text-flicker 2s linear infinite',
        'circuit-flow': 'circuit-flow 60s linear infinite',
			},
      boxShadow: {
        'cyberpunk-glow-primary-strong': '0 0 20px hsla(var(--primary), 0.8), 0 0 40px hsla(var(--primary), 0.5), inset 0 0 5px hsla(var(--primary), 0.3)',
        'cyberpunk-glow-secondary-strong': '0 0 20px hsla(var(--secondary), 0.8), 0 0 40px hsla(var(--secondary), 0.5), inset 0 0 5px hsla(var(--secondary), 0.3)',
      }
		},
	},
	plugins: [require('tailwindcss-animate')],
};