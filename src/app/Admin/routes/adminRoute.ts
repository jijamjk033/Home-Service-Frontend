import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "../components/admin-dashboard/admin-dashboard.component";
import { EmployeeListComponent } from "../components/employee-list/employee-list.component";
import { UserListComponent } from "../components/user-list/user-list.component";
import { AdminHomeComponent } from "../components/admin-home/admin-home.component";
import { adminAuthGuard } from "../guards/admin-auth.guard";
import { AdminCategoriesComponent } from "../components/admin-categories/admin-categories.component";
import { AdminServicesComponent } from "../components/admin-services/admin-services.component";
import { AdminAddCategoryComponent } from "../components/admin-add-category/admin-add-category.component";
import { AdminEditCategoryComponent } from "../components/admin-edit-category/admin-edit-category.component";
import { AddServicesComponent } from "../components/add-services/add-services.component";
import { EditServicesComponent } from "../components/edit-services/edit-services.component";

export const adminRoutes: Routes = [
    {
        path: 'adminHome', component: AdminHomeComponent, children: [
            { path: 'adminDashboard', component: AdminDashboardComponent },
            { path: 'userList', component: UserListComponent,canActivate: [adminAuthGuard] },
            { path: 'employeeList', component: EmployeeListComponent,canActivate: [adminAuthGuard] },
            { path: 'categories', component: AdminCategoriesComponent,canActivate: [adminAuthGuard] },
            { path: 'add-category', component: AdminAddCategoryComponent,canActivate: [adminAuthGuard] },
            { path: 'edit-category/:id', component: AdminEditCategoryComponent,canActivate: [adminAuthGuard] },
            { path: 'services/:id', component: AdminServicesComponent,canActivate: [adminAuthGuard] },
            { path: 'add-services/:id', component: AddServicesComponent,canActivate: [adminAuthGuard] },
            { path: 'edit-service/:id', component: EditServicesComponent,canActivate: [adminAuthGuard] },
            
        ]
    },
]