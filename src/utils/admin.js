

 export    const Admin = () => {
        const role =localStorage.getItem('role')
        return role === 'administrator'
    }