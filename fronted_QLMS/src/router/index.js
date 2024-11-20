import { createWebHistory, createRouter } from "vue-router";
import Sach from "@/views/Sach.vue";
import SachAdd from "@/views/SachAdd.vue";
import SachEdit from "@/views/SachEdit.vue";
import NotFound from "@/views/NotFound.vue";
import DocgiaList from "@/views/DocgiaList.vue";
import DocgiaForm from "@/components/DocgiaForm.vue";
import DocgiaDetails from "@/views/DocgiaDetails.vue";
import Muonsach from "@/views/Muonsach.vue";


// Route Nhân viên
import NhanvienList from "@/views/NhanvienList.vue";
import NhanvienAdd from "@/components/NhanvienAdd.vue";
import NhanvienEdit from "@/components/NhanvienEdit.vue";

import NXBList from "@/views/NXBList.vue";
import NXBAdd from "@/components/NXBAdd.vue";
import NXBEdit from "@/components/NXBEdit.vue";

import Login from "@/views/Dangnhap.vue";
import Register from "@/views/Dangky.vue";

import Sach_docgia from "@/views/Sach_docgia.vue";
import Lichsumuon from "@/views/Lichsumuon.vue";


const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  //Route Đọc giả
  {
    path: "/docgia",
    name: "docgia",
    component: DocgiaList,
  },
  {
    path: "/docgia/create",
    name: "createDocgia",
    component: DocgiaForm,
  },
  {
    path: "/docgia/edit/:id",
    name: "editDocgia",
    component: DocgiaForm,
  },
  {
    path: "/docgia/view/:id",
    name: "viewDocgia",
    component: DocgiaDetails,
  },

  //Route Sách

  {
    path: "/",
    name: "sach",
    component: Sach,
  },
  {
    path: "/add",
    name: "addBook",
    component: SachAdd,
  },
  {
    path: "/edit/:id",
    name: "editBook",
    component: SachEdit,
  },

  // Route Theo dõi mượn trả
  {
    path: "/theodoi",
    name: "muonsach",
    component: Muonsach,
  },

  // Route Nhân viên
  // Route Nhân viên
  {
    path: "/nhanvien",
    name: "nhanvienList",
    component: NhanvienList,
  },
  {
    path: "/nhanvien/add",
    name: "nhanvienAdd",
    component: NhanvienAdd,
  },
  {
    path: "/nhanvien/edit/:id",
    name: "nhanvienEdit",
    component: NhanvienEdit,
  },
  {
    path: "/nhaxuatban",
    name: "nhaxuatban",
    component: NXBList,
  },
  {
    path: "/nhaxuatban/add",
    name: "NXBAdd",
    component: NXBAdd,
  },
  {
    path: "/nhaxuatban/edit/:id",
    name: "NXBEdit",
    component: NXBEdit,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/nhaxuatban",
  },

  {
    path: "/sach/docgia",
    name: "sach_docgia",
    component: Sach_docgia,
  },
  {
    path: "/lichsumuon",
    name: "lichsu",
    component: Lichsumuon,
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
