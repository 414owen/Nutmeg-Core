window.onload = function() {

	eval (Nutmeg.localScope);

	var foreground = '#000';
	var background = '#f5f5f5';

	var style = mergeStyle({
		transition: {
			transition: 'all 0.3s ease'
		},
		base: {
			border: '0',
			color: foreground,
			backgroundColor: background,
			margin: '0',
			padding: '0',
			fontFamily: 'Raleway',
			fontWeight: '300',
			lineHeight: '1.15',
		},
		icon: {
			depends: ['transition'],
			fontSize: '2rem',
			width: '4rem',
			height: '3.5rem',
			lineHeight: '3.5rem',
			hover: {
				fontSize: '2.5rem',
				color: background,
				backgroundColor: foreground
			}
		},
		body: {
			depends: ['base', 'fill'],
			position: 'absolute'
		},
		fill: {
			width: '100%',
			height: '100%'
		},
		centerHor: {
			display: 'flex',
			justifyContent: 'center',
			textAlign: 'center'
		},
		center: {
			depends: ['fill', 'centerHor'],
			alignItems: 'center'
		},
	});

	body.style(style.body)(
		div.style(style.center)(
			div.style({height: "7rem"})(
				div('This Is Nutmeg').style({fontSize: '3rem'}),
				div.style({marginTop: '0.5rem', borderTop: '1px solid'}),
				div.style(style.centerHor)(
					div(i.class(['fa', 'fa-github']).style(style.icon)
						.link('https://github.com/414owen/Nutmeg')
					)
				)
			)
		)
	)
};
