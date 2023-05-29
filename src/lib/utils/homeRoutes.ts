	const links = [
		{ name: 'home', to: '/'},
		{ name: 'about', to: '/about' },
		{ name: 'projects', to: '/projects' },
		{ name: 'blog', to: '/blog'},
		{ name: 'services', to: '/services'},
		{ name: 'contact', to: '/contact' }
	];

    const useRoutes = (...routes: string[]) =>{
		const lowerCaseRoutes = routes.map(route => route.toLowerCase())
		let returnLinks = links.filter(link => lowerCaseRoutes.includes(link.name.toLowerCase()))
		return returnLinks
    }

	export { useRoutes }