	const links = [
		{ name: 'Home', to: '/'},
		{ name: 'About', to: '/about' },
		{ name: 'Projects', to: '/projects' },
		{ name: 'Blog', to: '/blog'},
		{ name: 'Services', to: '/services'},
		{ name: 'Contact', to: '/contact' }
	];

    const useRoutes = (...routes: string[]) =>{
		const lowerCaseRoutes = routes.map(route => route.toLowerCase())
		let returnLinks = links.filter(link => lowerCaseRoutes.includes(link.name.toLowerCase()))
		return returnLinks
    }

	export { useRoutes }