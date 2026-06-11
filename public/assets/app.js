/* ============================================================
   AgentSkills — shared data + i18n + helpers (frontend prototype)
   ============================================================ */

/* ---- i18n: UI strings ------------------------------------------ */
const I18N = {
  vi: {
    "nav.explore": "Khám phá",
    "nav.contribute": "Đóng góp",
    "search.nav": "Tìm skills, collections, tags...",
    "search.hero": "Bạn muốn học gì hôm nay?",
    "hero.badge": "✨ Cộng đồng chia sẻ kiến thức mở",
    "hero.title": 'Chia sẻ & khám phá <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">skills</span> và <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">hướng dẫn</span>',
    "hero.subtitle": "Tải lên file hướng dẫn (.md, .xml, .pdf, .docx...) hoặc cả bộ collection. Đánh giá, bình luận và học hỏi từ cộng đồng.",
    "stats.guides": "Hướng dẫn",
    "stats.collections": "Collections",
    "stats.authors": "Tác giả",
    "tab.all": "Tất cả",
    "tab.skills": "Skills",
    "tab.collections": "Collections",
    "results": "kết quả",
    "sort.popular": "Phổ biến nhất",
    "sort.downloads": "Tải nhiều nhất",
    "sort.recent": "Mới cập nhật",
    "lang.all": "Mọi ngôn ngữ",
    "dl.all": "Tải tất cả",
    "dl.category": "Tải danh mục",
    "empty.title": "Không tìm thấy kết quả nào 🔍",
    "empty.sub": "Thử từ khoá hoặc bộ lọc khác.",
    "footer.tagline": "Nền tảng mở để chia sẻ skills, hướng dẫn và collections cho cộng đồng developer. Website được xây dựng bởi phòng thí nghiệm AI In Future (AIFlab).",
    "footer.explore": "Khám phá",
    "footer.community": "Cộng đồng",
    "footer.guide": "Hướng dẫn đóng góp",
    "footer.rules": "Quy tắc",
    "footer.contact": "Liên hệ",
    "footer.copy": "© 2026 AgentSkills. Bản quyền thuộc về AI In Future (AIFlab).",
    "footer.builtby": "Website được xây dựng bởi phòng thí nghiệm AI In Future (AIFlab).",
    "footer.visits": "lượt truy cập",
    "files": "files",
    // detail
    "d.home": "Trang chủ",
    "d.updated": "cập nhật",
    "d.download": "Tải xuống",
    "d.colContents": "Nội dung bộ",
    "d.preview": "README / Xem trước",
    "d.comments": "Bình luận",
    "d.shareExp": "Chia sẻ trải nghiệm của bạn về",
    "d.thisCol": "bộ",
    "d.thisSkill": "skill",
    "d.you": "Bạn",
    "d.writeComment": "Viết bình luận...",
    "d.postComment": "Gửi bình luận",
    "d.noComments": "Chưa có bình luận nào. Hãy là người đầu tiên!",
    "d.stars": "Stars",
    "d.downloads": "Lượt tải",
    "d.rating": "Đánh giá",
    "d.info": "Thông tin",
    "d.type": "Loại",
    "d.format": "Định dạng",
    "d.numFiles": "Số file",
    "d.license": "License",
    "d.updatedRow": "Cập nhật",
    "d.category": "Danh mục",
    "d.language": "Ngôn ngữ",
    "d.tags": "Tags",
    "d.typeCol": "Collection (nhiều file)",
    "d.typeSkill": "Skill (file đơn)",
    "d.demoSend": "Demo UI — chức năng gửi sẽ kết nối backend sau.",
    "d.demoDownload": "Demo UI — sẽ tải file thật khi kết nối backend / storage.",
    // upload
    "u.title": "Đóng góp lên AgentSkills",
    "u.subtitle": "Chia sẻ một hướng dẫn đơn lẻ hoặc cả một bộ collection cho cộng đồng.",
    "u.step1": "1. Bạn muốn đăng gì?",
    "u.cardSkillT": "Skill / Hướng dẫn",
    "u.cardSkillD": "Một file đơn (.md, .xml, .pdf, .docx...)",
    "u.cardColT": "Collection",
    "u.cardColD": "Cả bộ gồm nhiều file hướng dẫn & cấu hình",
    "u.step2": "2. Tải file lên",
    "u.hint1": "(1 file)",
    "u.hintN": "(nhiều file)",
    "u.dzTitle": 'Kéo thả file vào đây hoặc <span class="text-indigo-600">chọn file</span>',
    "u.dzSub": "Hỗ trợ .md · .xml · .pdf · .doc/.docx · .txt · .zip — tối đa 25MB",
    "u.step3": "3. Thông tin chi tiết",
    "u.fTitle": "Tiêu đề",
    "u.fTitlePh": "VD: Hướng dẫn Prompt Engineering",
    "u.fDesc": "Mô tả ngắn",
    "u.fDescPh": "Mô tả ngắn gọn nội dung và lợi ích...",
    "u.fCat": "Danh mục",
    "u.fLang": "Ngôn ngữ của skill",
    "u.fLicense": "License",
    "u.fTags": "Tags",
    "u.fTagsNote": "(phân cách bằng dấu phẩy)",
    "u.fTagsPh": "prompt, llm, beginner",
    "u.cancel": "← Huỷ",
    "u.submit": "Đăng lên AgentSkills",
    "u.demo": "Demo UI — sẽ gửi lên server khi kết nối backend.",
    "u.needLogin": "Bạn cần đăng nhập để đóng góp.",
    "u.success": "Đã đăng thành công!",
    // auth nav
    "nav.login": "Đăng nhập",
    "nav.register": "Đăng ký",
    "nav.logout": "Đăng xuất",
    "nav.profile": "Trang cá nhân",
    "nav.admin": "Quản trị",
    "role.admin": "Admin",
    "role.sub-admin": "Sub-admin",
    "role.user": "User",
    "card.pending": "Chờ duyệt",
    "d.delete": "Xoá",
    "d.edit": "Chỉnh sửa",
    "d.edited": "Đã chỉnh sửa",
    "d.editTitle": "Chỉnh sửa nội dung",
    "d.save": "Lưu thay đổi",
    "d.cancel": "Huỷ",
    "d.readmeLabel": "Nội dung (README)",
    "d.approve": "Duyệt",
    "d.confirmDelete": "Xoá nội dung này? Hành động không thể hoàn tác.",
    "d.notFound": "Không tìm thấy nội dung (có thể đã bị xoá).",
    "d.pendingNote": "⏳ Đang chờ duyệt — chỉ bạn và quản trị viên nhìn thấy.",
    // login / register
    "login.title": "Đăng nhập",
    "login.sub": "Chào mừng trở lại AgentSkills.",
    "login.username": "Tên đăng nhập",
    "login.password": "Mật khẩu",
    "login.submit": "Đăng nhập",
    "login.noAcc": "Chưa có tài khoản?",
    "login.toRegister": "Đăng ký ngay",
    "login.or": "hoặc tiếp tục với",
    "login.oauthPrompt": "Nhập email/handle để mô phỏng đăng nhập",
    "reg.title": "Tạo tài khoản",
    "reg.sub": "Tham gia cộng đồng AgentSkills.",
    "reg.displayName": "Tên hiển thị",
    "reg.username": "Tên đăng nhập",
    "reg.password": "Mật khẩu",
    "reg.submit": "Đăng ký",
    "reg.hasAcc": "Đã có tài khoản?",
    "reg.toLogin": "Đăng nhập",
    "reg.roleNote": "Tài khoản mới mặc định có quyền User.",
    // profile
    "p.views": "lượt xem trang",
    "p.joined": "Tham gia",
    "p.provider": "Đăng nhập qua",
    "p.totalStars": "Tổng sao",
    "p.totalDl": "Tổng lượt tải",
    "p.skills": "Skills",
    "p.collections": "Collections",
    "p.catDist": "Phân bố theo danh mục",
    "p.contributions": "Đóng góp",
    "p.noContrib": "Chưa có đóng góp nào.",
    "p.changeRole": "Đổi role",
    "p.save": "Lưu",
    "p.notFound": "Không tìm thấy người dùng.",
    // admin
    "a.title": "Bảng quản trị",
    "a.sub": "Quản lý vai trò người dùng và duyệt nội dung.",
    "a.tabUsers": "Người dùng",
    "a.tabModeration": "Duyệt nội dung",
    "a.user": "Người dùng",
    "a.role": "Vai trò",
    "a.actions": "Thao tác",
    "a.pendingSkills": "Nội dung chờ duyệt",
    "a.noPending": "Không có nội dung nào chờ duyệt.",
    "a.you": "(bạn)",
    "a.noPerm": "Bạn không có quyền truy cập trang này.",
    // status & dates
    "status.active": "Đang hoạt động",
    "status.banned": "Bị cấm",
    "a.status": "Trạng thái",
    "a.joined": "Ngày đăng ký",
    "a.lastLogin": "Đăng nhập cuối",
    "a.lastContribution": "Đóng góp cuối",
    "a.ban": "Cấm",
    "a.unban": "Bỏ cấm",
    "a.tabCategories": "Danh mục",
    "a.addCat": "Thêm danh mục",
    "a.catVi": "Tên (VI)",
    "a.catEn": "Tên (EN)",
    "a.catDeleteConfirm": "Xoá danh mục này? Skill cũ thuộc danh mục sẽ hiển thị mã danh mục.",
    "a.tabReport": "Báo cáo",
    "a.repVisitsTotal": "Tổng truy cập",
    "a.repVisitsToday": "Truy cập hôm nay",
    "a.repUsers": "Người dùng",
    "a.repContrib": "Tổng đóng góp",
    "a.repSkills": "Skills",
    "a.repCollections": "Collections",
    "a.repVisitsOverTime": "Truy cập theo thời gian",
    "a.repNewUsers": "Người dùng mới đăng ký",
    "a.repTopContributors": "Đóng góp nhiều nhất",
    "a.repCatBreakdown": "Phân bố theo danh mục",
    "a.repMost": "Cao nhất",
    "a.repLeast": "Thấp nhất",
    "a.repUnit": "đóng góp",
    "a.from": "Từ",
    "a.to": "Đến",
    "u.catOther": "＋ Khác (tạo danh mục mới)",
    "u.newCatVi": "Tên danh mục (Tiếng Việt)",
    "u.newCatEn": "Tên danh mục (English)",
    "p.status": "Trạng thái",
    "p.lastLogin": "Đăng nhập cuối",
    "p.lastContribution": "Đóng góp cuối",
    "p.contact": "Liên hệ",
    "p.addLink": "Thêm liên kết",
    "p.linkPlaceholder": "Nhập link hoặc email...",
    "p.noLinks": "Chưa có liên kết nào.",
    "p.linksSaved": "Đã lưu liên kết liên hệ.",
    "p.timeline": "Đóng góp theo thời gian",
    "p.byMonth": "Theo tháng",
    "p.byYear": "Theo năm",
  },
  en: {
    "nav.explore": "Explore",
    "nav.contribute": "Contribute",
    "search.nav": "Search skills, collections, tags...",
    "search.hero": "What do you want to learn today?",
    "hero.badge": "✨ Open knowledge-sharing community",
    "hero.title": 'Share & discover <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">skills</span> and <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">guides</span>',
    "hero.subtitle": "Upload guide files (.md, .xml, .pdf, .docx...) or a whole collection. Rate, comment and learn from the community.",
    "stats.guides": "Guides",
    "stats.collections": "Collections",
    "stats.authors": "Authors",
    "tab.all": "All",
    "tab.skills": "Skills",
    "tab.collections": "Collections",
    "results": "results",
    "sort.popular": "Most popular",
    "sort.downloads": "Most downloaded",
    "sort.recent": "Recently updated",
    "lang.all": "All languages",
    "dl.all": "Download all",
    "dl.category": "Download category",
    "empty.title": "No results found 🔍",
    "empty.sub": "Try a different keyword or filter.",
    "footer.tagline": "An open platform to share skills, guides and collections with the developer community. This website is built by the AI In Future lab (AIFlab).",
    "footer.explore": "Explore",
    "footer.community": "Community",
    "footer.guide": "Contribution guide",
    "footer.rules": "Guidelines",
    "footer.contact": "Contact",
    "footer.copy": "© 2026 AgentSkills. All rights reserved by AI In Future (AIFlab).",
    "footer.builtby": "This website is built by the AI In Future lab (AIFlab).",
    "footer.visits": "visits",
    "files": "files",
    // detail
    "d.home": "Home",
    "d.updated": "updated",
    "d.download": "Download",
    "d.colContents": "Collection contents",
    "d.preview": "README / Preview",
    "d.comments": "Comments",
    "d.shareExp": "Share your experience with this",
    "d.thisCol": "collection",
    "d.thisSkill": "skill",
    "d.you": "You",
    "d.writeComment": "Write a comment...",
    "d.postComment": "Post comment",
    "d.noComments": "No comments yet. Be the first!",
    "d.stars": "Stars",
    "d.downloads": "Downloads",
    "d.rating": "Rating",
    "d.info": "Details",
    "d.type": "Type",
    "d.format": "Format",
    "d.numFiles": "Files",
    "d.license": "License",
    "d.updatedRow": "Updated",
    "d.category": "Category",
    "d.language": "Language",
    "d.tags": "Tags",
    "d.typeCol": "Collection (multiple files)",
    "d.typeSkill": "Skill (single file)",
    "d.demoSend": "Demo UI — posting will connect to a backend later.",
    "d.demoDownload": "Demo UI — real download once backend / storage is connected.",
    // upload
    "u.title": "Contribute to AgentSkills",
    "u.subtitle": "Share a single guide or a whole collection with the community.",
    "u.step1": "1. What do you want to post?",
    "u.cardSkillT": "Skill / Guide",
    "u.cardSkillD": "A single file (.md, .xml, .pdf, .docx...)",
    "u.cardColT": "Collection",
    "u.cardColD": "A whole set of guides & config files",
    "u.step2": "2. Upload files",
    "u.hint1": "(1 file)",
    "u.hintN": "(multiple files)",
    "u.dzTitle": 'Drag & drop files here or <span class="text-indigo-600">choose a file</span>',
    "u.dzSub": "Supports .md · .xml · .pdf · .doc/.docx · .txt · .zip — up to 25MB",
    "u.step3": "3. Details",
    "u.fTitle": "Title",
    "u.fTitlePh": "e.g. Prompt Engineering Guide",
    "u.fDesc": "Short description",
    "u.fDescPh": "Briefly describe the content and benefits...",
    "u.fCat": "Category",
    "u.fLang": "Skill language",
    "u.fLicense": "License",
    "u.fTags": "Tags",
    "u.fTagsNote": "(comma separated)",
    "u.fTagsPh": "prompt, llm, beginner",
    "u.cancel": "← Cancel",
    "u.submit": "Publish to AgentSkills",
    "u.demo": "Demo UI — will submit to the server once a backend is connected.",
    "u.needLogin": "You need to sign in to contribute.",
    "u.success": "Published successfully!",
    // auth nav
    "nav.login": "Sign in",
    "nav.register": "Sign up",
    "nav.logout": "Sign out",
    "nav.profile": "My profile",
    "nav.admin": "Admin",
    "role.admin": "Admin",
    "role.sub-admin": "Sub-admin",
    "role.user": "User",
    "card.pending": "Pending",
    "d.delete": "Delete",
    "d.edit": "Edit",
    "d.edited": "Edited",
    "d.editTitle": "Edit content",
    "d.save": "Save changes",
    "d.cancel": "Cancel",
    "d.readmeLabel": "Content (README)",
    "d.approve": "Approve",
    "d.confirmDelete": "Delete this content? This cannot be undone.",
    "d.notFound": "Content not found (it may have been deleted).",
    "d.pendingNote": "⏳ Awaiting approval — only you and admins can see this.",
    // login / register
    "login.title": "Sign in",
    "login.sub": "Welcome back to AgentSkills.",
    "login.username": "Username",
    "login.password": "Password",
    "login.submit": "Sign in",
    "login.noAcc": "No account yet?",
    "login.toRegister": "Sign up now",
    "login.or": "or continue with",
    "login.oauthPrompt": "Enter an email/handle to simulate sign-in",
    "reg.title": "Create account",
    "reg.sub": "Join the AgentSkills community.",
    "reg.displayName": "Display name",
    "reg.username": "Username",
    "reg.password": "Password",
    "reg.submit": "Sign up",
    "reg.hasAcc": "Already have an account?",
    "reg.toLogin": "Sign in",
    "reg.roleNote": "New accounts get the User role by default.",
    // profile
    "p.views": "profile views",
    "p.joined": "Joined",
    "p.provider": "Signed in via",
    "p.totalStars": "Total stars",
    "p.totalDl": "Total downloads",
    "p.skills": "Skills",
    "p.collections": "Collections",
    "p.catDist": "Category distribution",
    "p.contributions": "Contributions",
    "p.noContrib": "No contributions yet.",
    "p.changeRole": "Change role",
    "p.save": "Save",
    "p.notFound": "User not found.",
    // admin
    "a.title": "Admin dashboard",
    "a.sub": "Manage user roles and moderate content.",
    "a.tabUsers": "Users",
    "a.tabModeration": "Moderation",
    "a.user": "User",
    "a.role": "Role",
    "a.actions": "Actions",
    "a.pendingSkills": "Content awaiting approval",
    "a.noPending": "Nothing awaiting approval.",
    "a.you": "(you)",
    "a.noPerm": "You don't have permission to access this page.",
    // status & dates
    "status.active": "Active",
    "status.banned": "Banned",
    "a.status": "Status",
    "a.joined": "Joined",
    "a.lastLogin": "Last login",
    "a.lastContribution": "Last contribution",
    "a.ban": "Ban",
    "a.unban": "Unban",
    "a.tabCategories": "Categories",
    "a.addCat": "Add category",
    "a.catVi": "Name (VI)",
    "a.catEn": "Name (EN)",
    "a.catDeleteConfirm": "Delete this category? Skills in it will show the raw category id.",
    "a.tabReport": "Reports",
    "a.repVisitsTotal": "Total visits",
    "a.repVisitsToday": "Visits today",
    "a.repUsers": "Users",
    "a.repContrib": "Total contributions",
    "a.repSkills": "Skills",
    "a.repCollections": "Collections",
    "a.repVisitsOverTime": "Visits over time",
    "a.repNewUsers": "New registrations",
    "a.repTopContributors": "Top contributors",
    "a.repCatBreakdown": "Category breakdown",
    "a.repMost": "Most",
    "a.repLeast": "Least",
    "a.repUnit": "contributions",
    "a.from": "From",
    "a.to": "To",
    "u.catOther": "＋ Other (create new category)",
    "u.newCatVi": "Category name (Vietnamese)",
    "u.newCatEn": "Category name (English)",
    "p.status": "Status",
    "p.lastLogin": "Last login",
    "p.lastContribution": "Last contribution",
    "p.contact": "Contact",
    "p.addLink": "Add link",
    "p.linkPlaceholder": "Enter a link or email...",
    "p.noLinks": "No links yet.",
    "p.linksSaved": "Contact links saved.",
    "p.timeline": "Contributions over time",
    "p.byMonth": "By month",
    "p.byYear": "By year",
  },
};

/* skill content languages (shown as a badge / chosen on upload) */
const LANGS = {
  vi: { vi: "Tiếng Việt", en: "Vietnamese", flag: "🇻🇳" },
  en: { vi: "Tiếng Anh", en: "English", flag: "🇬🇧" },
};

let LANG = localStorage.getItem("skillhub_lang") || "vi";
function t(k) { return (I18N[LANG] && I18N[LANG][k] != null) ? I18N[LANG][k] : k; }
function langLabel(code) { const l = LANGS[code]; return l ? `${l.flag} ${l[LANG]}` : code; }

/* ---- Contact platforms (for profile links) --------------------- */
function normUrl(v) { return /^https?:\/\//i.test(v) ? v : "https://" + v; }
const PLATFORMS = [
  { id: "email", label: "Email", icon: "📧", href: (v) => "mailto:" + v },
  { id: "github", label: "GitHub", icon: "🐙", href: normUrl },
  { id: "facebook", label: "Facebook", icon: "📘", href: normUrl },
  { id: "twitter", label: "Twitter / X", icon: "🐦", href: normUrl },
  { id: "linkedin", label: "LinkedIn", icon: "💼", href: normUrl },
  { id: "instagram", label: "Instagram", icon: "📸", href: normUrl },
  { id: "youtube", label: "YouTube", icon: "▶️", href: normUrl },
  { id: "discord", label: "Discord", icon: "🎮", href: normUrl },
  { id: "telegram", label: "Telegram", icon: "✈️", href: normUrl },
  { id: "website", label: "Website", icon: "🌐", href: normUrl },
];
function platformById(id) { return PLATFORMS.find((p) => p.id === id) || { id, label: id, icon: "🔗", href: (v) => v }; }

/* ---- Categories (loaded from API; array below is a fallback) ---- */
let CATEGORIES = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "ai", vi: "AI & Prompting", en: "AI & Prompting" },
  { id: "coding", vi: "Lập trình", en: "Coding" },
  { id: "devops", vi: "DevOps", en: "DevOps" },
  { id: "data", vi: "Data & ML", en: "Data & ML" },
  { id: "design", vi: "Design", en: "Design" },
  { id: "writing", vi: "Viết & Docs", en: "Writing & Docs" },
  { id: "business", vi: "Business", en: "Business" },
];
function catLabel(id) { const c = CATEGORIES.find((x) => x.id === id); return c ? c[LANG] : id; }

const ALL_CAT = { id: "all", vi: "Tất cả", en: "All" };
let _catsLoaded = false;
async function loadCategories() {
  if (_catsLoaded) return CATEGORIES;
  try {
    const r = await fetch("/api/categories");
    if (r.ok) { const d = await r.json(); if (Array.isArray(d.categories)) CATEGORIES = [ALL_CAT, ...d.categories]; }
  } catch (e) { /* file:// → fallback */ }
  _catsLoaded = true;
  return CATEGORIES;
}

/* ---- Skill data (loaded from API; array below is a file:// fallback) -- */
const RANK_FE = { user: 1, "sub-admin": 2, admin: 3 };
function myRank() { return window.CURRENT_USER ? (RANK_FE[window.CURRENT_USER.role] || 0) : 0; }

let _skillsLoaded = false;
async function loadSkills() {
  if (_skillsLoaded) return SKILLS;
  try {
    const r = await fetch("/api/skills");
    if (r.ok) { const d = await r.json(); if (Array.isArray(d.skills)) SKILLS = d.skills; }
  } catch (e) { /* file:// → use fallback array */ }
  _skillsLoaded = true;
  return SKILLS;
}

let SKILLS = [
  {
    id: "claude-code-master", type: "collection", lang: "vi",
    title: "Claude Code Power Pack",
    author: { name: "Nguyễn An", handle: "@anhdev", avatar: "AN" },
    description: "Bộ hướng dẫn đầy đủ để dùng Claude Code hiệu quả: hooks, slash commands, MCP servers, subagents và cấu hình settings.json mẫu.",
    category: "ai", tags: ["claude", "agent", "cli", "automation"],
    stars: 1284, downloads: 8920, rating: 4.9, updated: "2026-06-02", license: "MIT", format: "MD",
    files: [
      { name: "README.md", type: "MD", size: "12 KB" },
      { name: "hooks-guide.md", type: "MD", size: "8 KB" },
      { name: "slash-commands.md", type: "MD", size: "6 KB" },
      { name: "settings.example.json", type: "JSON", size: "2 KB" },
      { name: "mcp-servers.xml", type: "XML", size: "4 KB" },
    ],
    readme: `# Claude Code Power Pack

Bộ công cụ giúp bạn khai thác tối đa **Claude Code** trong công việc hàng ngày.

## Bao gồm
- ⚙️ Cấu hình \`settings.json\` tối ưu sẵn
- 🪝 Hệ thống **hooks** tự động format & lint
- ⚡ Bộ **slash commands** cho review, test, deploy
- 🔌 Hướng dẫn cài **MCP servers** phổ biến

## Cài đặt nhanh
\`\`\`bash
git clone https://example.com/power-pack
cp settings.example.json ~/.claude/settings.json
\`\`\`

> 💡 Mẹo: Dùng \`/review\` trước mỗi lần commit để bắt lỗi sớm.`,
    comments: [
      { user: "Trần Bảo", avatar: "TB", time: "3 ngày trước", rating: 5, text: "Cực kỳ hữu ích! Bộ hooks giúp mình tiết kiệm cả tiếng mỗi ngày." },
      { user: "Lê Minh", avatar: "LM", time: "1 tuần trước", rating: 4, text: "Phần MCP hơi khó với người mới nhưng nhìn chung rất chất lượng." },
    ],
  },
  {
    id: "prompt-engineering-101", type: "skill", lang: "en",
    title: "Prompt Engineering 101",
    author: { name: "Phạm Hà", handle: "@haph", avatar: "PH" },
    description: "A foundational guide to prompting techniques: zero-shot, few-shot, chain-of-thought, and how to avoid hallucinations.",
    category: "ai", tags: ["prompt", "llm", "beginner"],
    stars: 932, downloads: 5410, rating: 4.8, updated: "2026-05-28", license: "CC-BY-4.0", format: "MD",
    files: [{ name: "prompt-engineering-101.md", type: "MD", size: "18 KB" }],
    readme: `# Prompt Engineering 101

Learn how to "talk" to language models to get the best results.

## Contents
1. Anatomy of a good prompt
2. Few-shot vs Zero-shot
3. Chain-of-Thought reasoning
4. Controlling output format`,
    comments: [
      { user: "Vũ Khánh", avatar: "VK", time: "2 days ago", rating: 5, text: "Clear explanations with real examples. 10/10!" },
    ],
  },
  {
    id: "react-best-practices", type: "skill", lang: "en",
    title: "React Best Practices 2026",
    author: { name: "Đỗ Quang", handle: "@quangdo", avatar: "ĐQ" },
    description: "A modern checklist & patterns for React: hooks, performance, state management and a standard folder structure.",
    category: "coding", tags: ["react", "frontend", "javascript"],
    stars: 778, downloads: 4120, rating: 4.7, updated: "2026-06-05", license: "MIT", format: "MD",
    files: [{ name: "react-best-practices.md", type: "MD", size: "22 KB" }],
    readme: `# React Best Practices 2026

Patterns you should (and shouldn't) use when writing React in 2026.`,
    comments: [],
  },
  {
    id: "docker-cheatsheet", type: "skill", lang: "vi",
    title: "Docker Cheatsheet Toàn Tập",
    author: { name: "Hoàng Sơn", handle: "@sonhoang", avatar: "HS" },
    description: "Tổng hợp lệnh Docker thường dùng kèm ví dụ Dockerfile và docker-compose mẫu cho dự án thực tế.",
    category: "devops", tags: ["docker", "container", "devops"],
    stars: 654, downloads: 6730, rating: 4.6, updated: "2026-05-20", license: "Apache-2.0", format: "PDF",
    files: [{ name: "docker-cheatsheet.pdf", type: "PDF", size: "1.4 MB" }],
    readme: `# Docker Cheatsheet

File PDF tổng hợp toàn bộ lệnh Docker quan trọng nhất.`,
    comments: [
      { user: "Ngô Linh", avatar: "NL", time: "5 ngày trước", rating: 5, text: "In ra dán cạnh bàn làm việc luôn, tiện vô cùng." },
    ],
  },
  {
    id: "ml-pipeline-kit", type: "collection", lang: "en",
    title: "ML Pipeline Starter Kit",
    author: { name: "Bùi Trang", handle: "@trangbui", avatar: "BT" },
    description: "A full set of templates for an end-to-end ML pipeline: data preprocessing, training, evaluation and MLflow config.",
    category: "data", tags: ["ml", "python", "mlflow", "pipeline"],
    stars: 541, downloads: 2980, rating: 4.8, updated: "2026-06-08", license: "BSD-3", format: "MD",
    files: [
      { name: "README.md", type: "MD", size: "9 KB" },
      { name: "preprocess.md", type: "MD", size: "7 KB" },
      { name: "train.md", type: "MD", size: "11 KB" },
      { name: "mlflow.config.xml", type: "XML", size: "3 KB" },
    ],
    readme: `# ML Pipeline Starter Kit

Spin up a clean Machine Learning pipeline in minutes.`,
    comments: [],
  },
  {
    id: "ui-design-tokens", type: "skill", lang: "vi",
    title: "Design Tokens System",
    author: { name: "Mai Chi", handle: "@chimai", avatar: "MC" },
    description: "Hướng dẫn xây dựng hệ thống design token nhất quán cho màu sắc, typography, spacing dùng chung Figma ↔ code.",
    category: "design", tags: ["design-system", "figma", "tokens"],
    stars: 489, downloads: 2210, rating: 4.5, updated: "2026-05-15", license: "CC-BY-4.0", format: "MD",
    files: [{ name: "design-tokens.md", type: "MD", size: "15 KB" }],
    readme: `# Design Tokens System

Đồng bộ thiết kế giữa designer và developer bằng design tokens.`,
    comments: [],
  },
  {
    id: "technical-writing", type: "skill", lang: "en",
    title: "Technical Writing Guide",
    author: { name: "Lý Thu", handle: "@thuly", avatar: "LT" },
    description: "How to write clear, readable technical docs: structure, tone, code examples and docs versioning.",
    category: "writing", tags: ["docs", "writing", "documentation"],
    stars: 376, downloads: 1840, rating: 4.7, updated: "2026-06-01", license: "MIT", format: "DOCX",
    files: [{ name: "technical-writing.docx", type: "DOCX", size: "320 KB" }],
    readme: `# Technical Writing Guide

Write docs people actually want to read.`,
    comments: [],
  },
  {
    id: "saas-launch-checklist", type: "collection", lang: "vi",
    title: "SaaS Launch Checklist",
    author: { name: "Trịnh Đức", handle: "@ductrinh", avatar: "TĐ" },
    description: "Bộ checklist & template đầy đủ để ra mắt một sản phẩm SaaS: pricing, onboarding, analytics, legal.",
    category: "business", tags: ["saas", "startup", "launch"],
    stars: 312, downloads: 1520, rating: 4.6, updated: "2026-05-30", license: "MIT", format: "PDF",
    files: [
      { name: "checklist.pdf", type: "PDF", size: "800 KB" },
      { name: "pricing-template.md", type: "MD", size: "5 KB" },
      { name: "onboarding-flow.md", type: "MD", size: "6 KB" },
    ],
    readme: `# SaaS Launch Checklist

Đừng quên bất cứ điều gì khi ra mắt sản phẩm SaaS của bạn.`,
    comments: [],
  },
];

/* ---- Icons (Lucide-style inline SVG) --------------------------- */
const ICONS = {
  star: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  collection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
};

/* ---- Helpers --------------------------------------------------- */
function fmtNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}
function escHtml(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escAttr2(s) { return escHtml(s).replace(/"/g, "&quot;"); }

/* ---- date-range helpers (shared by profile & admin charts) ----- */
function monthRange(from, to) {
  const [fy, fm] = from.split("-").map(Number), [ty, tm] = to.split("-").map(Number);
  if (ty < fy || (ty === fy && tm < fm)) return [from];
  const out = []; let y = fy, m = fm, guard = 0;
  while ((y < ty || (y === ty && m <= tm)) && guard++ < 600) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    if (++m > 12) { m = 1; y++; }
  }
  return out;
}
function monthLabel(m) { const [y, mm] = m.split("-"); return `${mm}/${y}`; }
function dayRange(from, to) {
  const out = []; const d = new Date(from + "T00:00:00"), end = new Date(to + "T00:00:00");
  if (isNaN(d) || isNaN(end) || d > end) return from ? [from] : [];
  let guard = 0;
  while (d <= end && guard++ < 2000) { out.push(d.toISOString().slice(0, 10)); d.setDate(d.getDate() + 1); }
  return out;
}
const FORMAT_COLORS = {
  MD: "bg-sky-100 text-sky-700",
  XML: "bg-amber-100 text-amber-700",
  PDF: "bg-rose-100 text-rose-700",
  DOCX: "bg-blue-100 text-blue-700",
  JSON: "bg-emerald-100 text-emerald-700",
};
function badge(text, cls) {
  return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${cls}">${text}</span>`;
}

function skillCard(s) {
  const isCol = s.type === "collection";
  const typeBadge = isCol
    ? badge(`${ICONS.collection} Collection`, "bg-violet-100 text-violet-700")
    : badge(`${ICONS.file} Skill`, "bg-indigo-100 text-indigo-700");
  const fmtBadge = badge(s.format, FORMAT_COLORS[s.format] || "bg-slate-100 text-slate-700");
  const langBadge = badge(langLabel(s.lang), "bg-slate-100 text-slate-600");
  const editedBadge = s.edited ? badge(t("d.edited"), "bg-slate-100 text-slate-500") : "";
  const tags = s.tags.slice(0, 3)
    .map((t) => `<span class="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">#${t}</span>`).join("");

  return `
  <a href="detail.html?id=${s.id}" class="group block bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-200">
    <div class="flex items-center justify-between mb-3 gap-2">
      <div class="flex items-center gap-2 flex-wrap">${typeBadge}${fmtBadge}${langBadge}${editedBadge}</div>
      <div class="flex items-center gap-2 shrink-0">
        ${isCol ? `<span class="text-xs text-slate-400">${s.files.length} ${t("files")}</span>` : ""}
        <button onclick="event.preventDefault();event.stopPropagation();dlSkill('${s.id}')" title="${t("d.download")}" class="text-slate-400 hover:text-indigo-600 transition-colors">${ICONS.download}</button>
      </div>
    </div>
    <h3 class="font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">${s.title}</h3>
    <p class="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">${s.description}</p>
    <div class="flex flex-wrap gap-1.5 mt-3">${tags}</div>
    <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
      <span onclick="event.preventDefault();event.stopPropagation();location.href='profile.html?u=${s.authorUsername || ""}'" class="flex items-center gap-2 cursor-pointer hover:opacity-75">
        <span class="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-[11px] font-bold grid place-items-center">${s.author.avatar}</span>
        <span class="text-xs text-slate-600 font-medium">${s.author.name}</span>
      </span>
      <div class="flex items-center gap-3 text-slate-500">
        <span class="flex items-center gap-1 text-amber-500 font-semibold text-sm">${ICONS.star}${fmtNum(s.stars)}</span>
        <span class="flex items-center gap-1 text-sm">${ICONS.download}${fmtNum(s.downloads)}</span>
      </div>
    </div>
  </a>`;
}

/* ---- i18n apply ------------------------------------------------- */
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (I18N[LANG][k] != null) el.textContent = I18N[LANG][k];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const k = el.getAttribute("data-i18n-html");
    if (I18N[LANG][k] != null) el.innerHTML = I18N[LANG][k];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const k = el.getAttribute("data-i18n-ph");
    if (I18N[LANG][k] != null) el.placeholder = I18N[LANG][k];
  });
  document.documentElement.lang = LANG;
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem("skillhub_lang", lang);
  document.querySelectorAll("#langToggle [data-lang]").forEach((b) => {
    const active = b.dataset.lang === lang;
    b.classList.toggle("bg-indigo-600", active);
    b.classList.toggle("text-white", active);
    b.classList.toggle("text-slate-500", !active);
  });
  applyI18n();
  document.dispatchEvent(new CustomEvent("i18n:changed"));
}

function initLang() {
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (btn) setLang(btn.dataset.lang);
    });
  }
  setLang(LANG); // apply persisted choice
}

/* ---- Home page logic ------------------------------------------- */
async function initHome() {
  const grid = document.getElementById("skillGrid");
  if (!grid) return;
  await Promise.all([loadSkills(), loadCategories()]);

  const gEl = document.getElementById("statGuides"), cEl = document.getElementById("statCollections"), aEl = document.getElementById("statAuthors");
  if (gEl) gEl.textContent = SKILLS.length;
  if (cEl) cEl.textContent = SKILLS.filter((s) => s.type === "collection").length;
  if (aEl) aEl.textContent = new Set(SKILLS.map((s) => s.authorUsername).filter(Boolean)).size;

  let state = { type: "all", category: "all", lang: "all", q: "", sort: "popular" };

  function renderCats() {
    const catBar = document.getElementById("categoryBar");
    catBar.innerHTML = CATEGORIES.map(
      (c) => `<button data-cat="${c.id}" class="cat-chip whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        c.id === state.category
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
      }">${c[LANG]}</button>`
    ).join("");
  }

  function apply() {
    let list = SKILLS.filter((s) => {
      if (state.type !== "all" && s.type !== state.type) return false;
      if (state.category !== "all" && s.category !== state.category) return false;
      if (state.lang !== "all" && s.lang !== state.lang) return false;
      if (state.q) {
        const hay = (s.title + s.description + s.tags.join(" ")).toLowerCase();
        if (!hay.includes(state.q.toLowerCase())) return false;
      }
      return true;
    });
    if (state.sort === "popular") list.sort((a, b) => b.stars - a.stars);
    if (state.sort === "downloads") list.sort((a, b) => b.downloads - a.downloads);
    if (state.sort === "recent") list.sort((a, b) => b.updated.localeCompare(a.updated));

    document.getElementById("resultCount").textContent = list.length;
    grid.innerHTML = list.length
      ? list.map(skillCard).join("")
      : `<div class="col-span-full text-center py-16 text-slate-400">
           <p class="text-lg">${t("empty.title")}</p>
           <p class="text-sm mt-1">${t("empty.sub")}</p>
         </div>`;
    const dlCat = document.getElementById("dlCatBtn");
    if (dlCat) dlCat.classList.toggle("hidden", state.category === "all");
  }

  renderCats();

  // download buttons
  const dlAllBtn = document.getElementById("dlAllBtn");
  if (dlAllBtn) dlAllBtn.addEventListener("click", dlAll);
  const dlCatBtn = document.getElementById("dlCatBtn");
  if (dlCatBtn) dlCatBtn.addEventListener("click", () => dlCategory(state.category));

  // tabs
  document.querySelectorAll("[data-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.type = btn.dataset.type;
      document.querySelectorAll("[data-type]").forEach((b) => {
        b.classList.toggle("bg-white", b === btn);
        b.classList.toggle("text-indigo-600", b === btn);
        b.classList.toggle("shadow-sm", b === btn);
        b.classList.toggle("text-slate-500", b !== btn);
      });
      apply();
    });
  });

  // categories
  document.getElementById("categoryBar").addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-chip");
    if (!btn) return;
    state.category = btn.dataset.cat;
    renderCats();
    apply();
  });

  // search
  const searchInputs = document.querySelectorAll("[data-search]");
  searchInputs.forEach((inp) =>
    inp.addEventListener("input", (e) => {
      state.q = e.target.value;
      searchInputs.forEach((o) => o !== e.target && (o.value = e.target.value));
      apply();
    })
  );

  // sort
  const sortSel = document.getElementById("sortSelect");
  sortSel && sortSel.addEventListener("change", (e) => { state.sort = e.target.value; apply(); });

  // language filter
  const langSel = document.getElementById("langFilter");
  langSel && langSel.addEventListener("change", (e) => { state.lang = e.target.value; apply(); });

  // re-render on language switch
  document.addEventListener("i18n:changed", () => { renderCats(); apply(); });

  apply();
}

/* ---- Detail page logic ----------------------------------------- */
async function initDetail() {
  const root = document.getElementById("detailRoot");
  if (!root) return;
  await Promise.all([loadSkills(), loadCategories()]);

  const id = new URLSearchParams(location.search).get("id");
  const s = SKILLS.find((x) => x.id === id) || SKILLS[0];
  if (!s) {
    root.innerHTML = `<div class="text-center py-20 text-slate-400"><p class="text-lg">${t("d.notFound")}</p><a href="index.html" class="text-indigo-600 text-sm mt-2 inline-block">← ${t("d.home")}</a></div>`;
    return;
  }

  function render() {
    const isCol = s.type === "collection";
    const canModerate = myRank() >= 2;
    const isOwner = window.CURRENT_USER && window.CURRENT_USER.username === s.authorUsername;
    const editBtn = (isOwner || canModerate)
      ? `<button onclick="openEditSkill('${s.id}')" class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors">✏️ ${t("d.edit")}</button>`
      : "";
    const delBtn = canModerate
      ? `<button onclick="deleteSkill('${s.id}')" class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 font-semibold text-sm transition-colors">🗑 ${t("d.delete")}</button>`
      : "";
    document.title = `${s.title} — AgentSkills`;

    const stars = "★★★★★".split("").map((_, i) =>
      `<span class="${i < Math.round(s.rating) ? "text-amber-400" : "text-slate-300"}">★</span>`).join("");

    const filesList = s.files.map(
      (f) => `
      <div class="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-slate-400">${ICONS.file}</span>
          <span class="font-medium text-slate-700 text-sm truncate">${f.name}</span>
          ${badge(f.type, FORMAT_COLORS[f.type] || "bg-slate-100 text-slate-700")}
        </div>
        <span class="text-xs text-slate-400 shrink-0">${f.size}</span>
      </div>`).join("");

    const commentsHTML = s.comments.length
      ? s.comments.map((c) => `
        <div class="flex gap-3 py-4 border-b border-slate-100 last:border-0">
          <span class="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-xs font-bold grid place-items-center">${c.avatar}</span>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-slate-800 text-sm">${c.user}</span>
              <span class="text-amber-400 text-xs">${"★".repeat(c.rating)}<span class="text-slate-300">${"★".repeat(5 - c.rating)}</span></span>
              <span class="text-xs text-slate-400">· ${c.time}</span>
            </div>
            <p class="text-sm text-slate-600 mt-1 leading-relaxed">${c.text}</p>
          </div>
        </div>`).join("")
      : `<p class="text-sm text-slate-400 py-6 text-center">${t("d.noComments")}</p>`;

    const tags = s.tags
      .map((tg) => `<a href="index.html" class="text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors">#${tg}</a>`).join("");

    const readmeHTML = window.marked ? marked.parse(s.readme) : `<pre>${s.readme}</pre>`;

    root.innerHTML = `
    <nav class="text-sm text-slate-400 mb-5 flex items-center gap-2">
      <a href="index.html" class="hover:text-slate-600">${t("d.home")}</a><span>/</span>
      <a href="index.html" class="hover:text-slate-600">${isCol ? t("tab.collections") : t("tab.skills")}</a><span>/</span>
      <span class="text-slate-600">${s.title}</span>
    </nav>

    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-3 flex-wrap">
          ${isCol ? badge(`${ICONS.collection} Collection`, "bg-violet-100 text-violet-700") : badge(`${ICONS.file} Skill`, "bg-indigo-100 text-indigo-700")}
          ${badge(s.format, FORMAT_COLORS[s.format] || "bg-slate-100 text-slate-700")}
          ${badge(langLabel(s.lang), "bg-slate-100 text-slate-600")}
          ${s.edited ? badge(t("d.edited"), "bg-slate-100 text-slate-500") : ""}
          <span class="text-xs text-slate-400">${t("d.updated")} ${s.updated}</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">${s.title}</h1>
        <a href="profile.html?u=${s.authorUsername || ""}" class="flex items-center gap-2 mt-3 w-fit hover:opacity-75">
          <span class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-xs font-bold grid place-items-center">${s.author.avatar}</span>
          <span class="text-sm text-slate-700 font-medium">${s.author.name}</span>
          <span class="text-sm text-slate-400">${s.author.handle}</span>
        </a>
      </div>
      <div class="flex items-center gap-2 shrink-0 flex-wrap">
        ${editBtn}${delBtn}
        <button onclick="toggleStar(this)" class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50 font-semibold text-sm text-slate-700 transition-colors">
          ${ICONS.star}<span data-star-count>${fmtNum(s.stars)}</span>
        </button>
        <button onclick="dlSkill('${s.id}')" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm shadow-indigo-200 transition-colors">
          ${ICONS.download} ${t("d.download")}
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <p class="text-slate-600 leading-relaxed text-[15px]">${s.description}</p>

        ${isCol ? `
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 class="font-bold text-slate-800 text-sm">📁 ${t("d.colContents")} (${s.files.length} ${t("files")})</h2>
          </div>
          <div class="divide-y divide-slate-100">${filesList}</div>
        </div>` : ""}

        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div class="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <h2 class="font-bold text-slate-800 text-sm">📄 ${t("d.preview")}</h2>
          </div>
          <div class="prose prose-slate prose-sm max-w-none p-6">${readmeHTML}</div>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 class="font-bold text-slate-800 mb-1">${t("d.comments")} (${s.comments.length})</h2>
          <p class="text-xs text-slate-400 mb-4">${t("d.shareExp")} ${isCol ? t("d.thisCol") : t("d.thisSkill")}.</p>
          <div class="flex gap-3 mb-2">
            <span class="w-9 h-9 shrink-0 rounded-full bg-slate-200 grid place-items-center text-slate-500 text-xs font-bold">${t("d.you")}</span>
            <div class="flex-1">
              <div class="flex items-center gap-1 mb-2 text-xl text-slate-300" id="ratingStars">
                ${[1,2,3,4,5].map(n=>`<button onclick="setRating(${n})" data-r="${n}" class="hover:text-amber-400 transition-colors">★</button>`).join("")}
              </div>
              <textarea rows="3" placeholder="${t("d.writeComment")}" class="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 resize-none"></textarea>
              <div class="text-right mt-2">
                <button onclick="alert(t('d.demoSend'))" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">${t("d.postComment")}</button>
              </div>
            </div>
          </div>
          <div class="mt-4">${commentsHTML}</div>
        </div>
      </div>

      <aside class="space-y-5">
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div><div class="text-2xl font-extrabold text-slate-900">${fmtNum(s.stars)}</div><div class="text-xs text-slate-400 mt-0.5">${t("d.stars")}</div></div>
            <div><div class="text-2xl font-extrabold text-slate-900">${fmtNum(s.downloads)}</div><div class="text-xs text-slate-400 mt-0.5">${t("d.downloads")}</div></div>
            <div><div class="text-2xl font-extrabold text-amber-500">${s.rating}</div><div class="text-xs text-slate-400 mt-0.5">${t("d.rating")}</div></div>
          </div>
          <div class="text-center mt-2 text-sm">${stars}</div>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-sm">
          <h3 class="font-bold text-slate-800">${t("d.info")}</h3>
          ${infoRow(t("d.type"), isCol ? t("d.typeCol") : t("d.typeSkill"))}
          ${infoRow(t("d.language"), langLabel(s.lang))}
          ${infoRow(t("d.format"), s.format)}
          ${infoRow(t("d.numFiles"), String(s.files.length))}
          ${infoRow(t("d.license"), s.license)}
          ${infoRow(t("d.updatedRow"), s.updated)}
          ${infoRow(t("d.category"), catLabel(s.category))}
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 class="font-bold text-slate-800 text-sm mb-3">${t("d.tags")}</h3>
          <div class="flex flex-wrap gap-2">${tags}</div>
        </div>
      </aside>
    </div>`;
  }

  render();
  document.addEventListener("i18n:changed", render);
  document.addEventListener("auth:changed", render);
}

function infoRow(k, v) {
  return `<div class="flex justify-between gap-3"><span class="text-slate-400">${k}</span><span class="text-slate-700 font-medium text-right">${v}</span></div>`;
}

/* ---- Small interactions (global) ------------------------------- */
let _starred = false;
function toggleStar(btn) {
  _starred = !_starred;
  btn.classList.toggle("bg-amber-50", _starred);
  btn.classList.toggle("border-amber-300", _starred);
  btn.classList.toggle("text-amber-600", _starred);
}
/* ---- Downloads (ZIP) ---- */
function dlSkill(id) { window.location.href = "/api/download/skill/" + encodeURIComponent(id); }
function dlCategory(catId) { if (!catId || catId === "all") return dlAll(); window.location.href = "/api/download/category/" + encodeURIComponent(catId); }
function dlAll() { window.location.href = "/api/download/all"; }

async function deleteSkill(id) {
  if (!confirm(t("d.confirmDelete"))) return;
  const r = await fetch("/api/skills/" + encodeURIComponent(id), { method: "DELETE" });
  if (r.ok) location.href = "index.html";
  else { const d = await r.json().catch(() => ({})); alert(d.error || "Error"); }
}

/* ---- Edit skill modal ------------------------------------------ */
function openEditSkill(id) {
  const s = SKILLS.find((x) => x.id === id);
  if (!s) return;
  const cats = CATEGORIES.filter((c) => c.id !== "all");
  const fld = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all";
  const lbl = "block text-xs font-medium text-slate-500 mb-1.5";
  const overlay = document.createElement("div");
  overlay.id = "editModal";
  overlay.className = "fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm grid place-items-center p-4";
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-slate-900">${t("d.editTitle")}</h2>
        <button onclick="closeEditSkill()" class="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
      </div>
      <div class="space-y-4">
        <div><label class="${lbl}">${t("u.fTitle")}</label><input id="ed-title" value="${escAttr2(s.title)}" class="${fld}" /></div>
        <div><label class="${lbl}">${t("u.fDesc")}</label><textarea id="ed-desc" rows="3" class="${fld} resize-none">${escHtml(s.description)}</textarea></div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div><label class="${lbl}">${t("u.fCat")}</label>
            <select id="ed-cat" class="${fld} bg-white cursor-pointer">${cats.map((c) => `<option value="${c.id}" ${c.id === s.category ? "selected" : ""}>${c[LANG]}</option>`).join("")}</select></div>
          <div><label class="${lbl}">${t("u.fLang")}</label>
            <select id="ed-lang" class="${fld} bg-white cursor-pointer">${Object.keys(LANGS).map((code) => `<option value="${code}" ${code === s.lang ? "selected" : ""}>${LANGS[code].flag} ${LANGS[code][LANG]}</option>`).join("")}</select></div>
        </div>
        <div><label class="${lbl}">${t("u.fLicense")}</label><input id="ed-license" value="${escAttr2(s.license)}" class="${fld}" /></div>
        <div><label class="${lbl}">${t("u.fTags")}</label><input id="ed-tags" value="${escAttr2(s.tags.join(", "))}" class="${fld}" /></div>
        <div><label class="${lbl}">${t("d.readmeLabel")}</label><textarea id="ed-readme" rows="6" class="${fld} font-mono text-xs resize-y">${escHtml(s.readme)}</textarea></div>
      </div>
      <div class="flex justify-end gap-2 mt-5">
        <button onclick="closeEditSkill()" class="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">${t("d.cancel")}</button>
        <button onclick="saveEditSkill('${s.id}')" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">${t("d.save")}</button>
      </div>
    </div>`;
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeEditSkill(); });
  document.body.appendChild(overlay);
}
function closeEditSkill() { const m = document.getElementById("editModal"); if (m) m.remove(); }
async function saveEditSkill(id) {
  const gv = (i) => document.getElementById(i).value.trim();
  const payload = {
    title: gv("ed-title"), description: gv("ed-desc"),
    category: gv("ed-cat"), lang: gv("ed-lang"),
    license: gv("ed-license"), tags: gv("ed-tags"),
    readme: document.getElementById("ed-readme").value,
  };
  if (!payload.title) { alert(t("u.fTitle")); return; }
  const r = await fetch("/api/skills/" + encodeURIComponent(id), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const d = await r.json();
  if (r.ok) { closeEditSkill(); _skillsLoaded = false; location.reload(); }
  else alert(d.error || "Error");
}
function setRating(n) {
  document.querySelectorAll("#ratingStars button").forEach((b) => {
    b.classList.toggle("text-amber-400", b.dataset.r <= n);
    b.classList.toggle("text-slate-300", b.dataset.r > n);
  });
}

/* ---- Shared footer (injected on every page) -------------------- */
function renderFooter() {
  const el = document.getElementById("siteFooter");
  if (!el) return;
  el.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-4 gap-8 text-sm">
      <div class="sm:col-span-2">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-white font-black">A</span>
          <span class="font-extrabold">Agent<span class="text-indigo-600">Skills</span></span>
        </div>
        <p class="text-slate-500 max-w-xs">${t("footer.tagline")}</p>
        <p class="text-xs text-slate-400 mt-3">👁 ${window.SITE_VISITS != null ? fmtNum(window.SITE_VISITS) : "…"} ${t("footer.visits")}</p>
      </div>
      <div>
        <h4 class="font-semibold text-slate-800 mb-3">${t("footer.explore")}</h4>
        <ul class="space-y-2 text-slate-500">
          <li><a href="index.html" class="hover:text-indigo-600">${t("tab.skills")}</a></li>
          <li><a href="index.html" class="hover:text-indigo-600">${t("tab.collections")}</a></li>
          <li><a href="upload.html" class="hover:text-indigo-600">${t("nav.contribute")}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-slate-800 mb-3">${t("footer.community")}</h4>
        <ul class="space-y-2 text-slate-500">
          <li><a href="#" class="hover:text-indigo-600">${t("footer.guide")}</a></li>
          <li><a href="#" class="hover:text-indigo-600">${t("footer.rules")}</a></li>
          <li><a href="#" class="hover:text-indigo-600">${t("footer.contact")}</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-100 py-5 text-center text-xs text-slate-400">${t("footer.copy")}</div>`;
}
document.addEventListener("i18n:changed", renderFooter);

/* ---- Boot ------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initLang();
  renderFooter();
  initHome();
  initDetail();
});
