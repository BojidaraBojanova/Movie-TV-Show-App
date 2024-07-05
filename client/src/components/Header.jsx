import logo from '../assets/images/logo.gif'

export default function Header(){
    return(
        <header className="section site-header">
        <div className="wrapper">
            <h6 className="site-logo">
                <a href="#">
                    {/* <img src={logo} alt="logo" /> */}
                </a>
            </h6>

            <nav className="search-nav">
                <form action="" method="GET">
                    <input type="text" name="searchQuery" placeholder="Search..."/>
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </nav>

            <nav className="main-nav">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Films</a></li>
                    <li><a href="">TV Show</a></li>
                    <li><a href="">User</a></li>
                    <li><a href="">Login</a></li>
                    <li><a href="">Registration</a></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}