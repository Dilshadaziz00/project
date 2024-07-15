function CustomNavbar() {
    const element = Reflect.construct(HTMLElement, [], CustomNavbar);

    const shadow = element.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
        }

        .container-fluid {
            padding: 0;
        }

        nav {
            background-color: #ffffff;
            padding: 10px 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-logo img {
            max-width: 38px;
            border-radius: 50px;
        }

        .search-box {
            position: relative;
            /* width: 100%;
            max-width: 400px; */
            display: flex;
            align-items: center;
        }

        .search-box input {
            /* width: 100%; */
            padding: 10px 10px 10px 40px;
            border: 1px solid #ddd;
            border-radius: 50px;
            transition: border-color 0.3s;
        }

        .search-box input:focus {
            border-color: #007bff;
        }

        .search-box .fas {
            position: absolute;
            left: 10px;
            font-size: 16px;
            color: #999;
        }

        .buttons {
            display: flex;
            align-items: center;
        }

        .buttons button {
            margin-left: 10px;
            border-radius: 50px;
            background-color: #ffffff;
            border: none;
            transition: background-color 0.3s, color 0.3s;
        }

        .fas.fa-user {
            font-size: 24px;
            margin-left: 10px;
        }

        .nav-icons {
            display: flex;
            align-items: center;
        }

        .nav-icons li {
            margin: 0 10px;
        }

        @media (max-width: 991.98px) {
            .buttons {
                flex-wrap: wrap;
            }

            .search-box {
                width: 100%; 
                max-width: none;
                margin-top: 10px;
            }

            .nav-icons {
                display: none;
            }
        }
    </style>
          <div class="container-fluid">
        <!-- Navbar Started -->
        <nav class="navbar">
            <div class="navbar-logo">
                <img src="download.png" alt="Quizell Logo">
            </div>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="search" placeholder="Search...">
            </div>
            <ul class="nav-icons list-unstyled m-0 p-0">
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-home"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-play"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-store"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-users"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-plus"></i></a>
                </li>
            </ul>
            <div class="buttons">
              <a href="login.html"><button type="button">Login</button></a>
               <a href="register.html"> <button type="button">Sign Up</button></a>
                <i class="fas fa-user"></i>
            </div>
        </nav>
        <!-- Navbar Ended -->
         
          
    </div>
    `;

    return element;
}

// Set up the prototype chain
CustomNavbar.prototype = Object.create(HTMLElement.prototype);
CustomNavbar.prototype.constructor = CustomNavbar;

// Define the custom element
customElements.define('custom-navbar', CustomNavbar);
