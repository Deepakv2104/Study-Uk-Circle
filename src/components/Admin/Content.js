
import Icon from "./small-comp/Icon";
import IconButton from "./small-comp/IconButton";
import { Outlet } from "react-router-dom";

function Content({ onSidebarHide,user }) {
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        {/* Sidebar content */}
      </div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">
                  Hello {user.name || "Guest"}
                </div>
                <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                  <Icon path="res-react-dash-premium-star" />
                </div>
              </div>
              <div className="flex items-center">
                <Icon path="res-react-dash-date-indicator" className="w-3 h-3" />
                <div className="ml-2">February 20</div>
              </div>
            </div>
            <IconButton
              icon="res-react-dash-sidebar-open"
              className="block sm:hidden"
              onClick={onSidebarHide}
            />
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Icon
              path="res-react-dash-search"
              className="w-5 h-5 search-icon left-3 absolute"
            />
            <form action="#" method="POST">
              <input
                type="text"
                name="company_website"
                id="company_website"
                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                placeholder="search"
              />
            </form>
          </div>
        </div>

        {/* Child components within the Outlet */}
        <Outlet user={user} />
      </div>
    </div>
  );
}

export default Content;
