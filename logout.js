function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
    window.location.href = 'auth.html';
}
