import { useState } from "react";
import CategoryPills from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import PageHeader from "./layout/PageHeader";
import VideGridItem from "./components/VideGridItem";
import Sidebar from "./components/Sidebar";
import SideBarProvider from "./context/sidebarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <SideBarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="flex grow overflow-auto ">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
}

export default App;
