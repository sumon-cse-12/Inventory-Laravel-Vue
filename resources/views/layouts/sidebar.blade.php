<div class="sidebar">

    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
            <a href="#" class="d-block">Alexander Pierce</a>
        </div>
    </div>

    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
            data-accordion="false">


            <li class="nav-item">
                <router-link to="/admin/dashboard" active-class="active" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/category" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-square"></i>
                    <p>
                     Category List
                    </p>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link to="/admin/category/create" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-square"></i>
                    <p>
                     Category Create
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'brand-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Brands
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'supplier-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Suppliers
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'customer-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Customers
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'staff-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Staff
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'product-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Product
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'expense-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Expense
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'salary-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                     Salary
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'pos'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                    Pos
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'order-index'}" active-class="active" class="nav-link">
                    <i class="nav-icon fa fa-list"></i>
                    <p>
                    Orders
                    </p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link  to="/admin/settings" active-class="active" class="nav-link">
                    <i class="nav-icon fas fa-cog"></i>
                    <p>
                     Settings
                    </p>
                </router-link >
            </li>
            <li class="nav-item">
                <router-link  to="admin/profile" active-class="active" class="nav-link">
                    <i class="nav-icon fas fa-user"></i>
                    <p>
                     Profile
                    </router-link >
                </a>
            </li>
        </ul>
    </nav>

</div>
