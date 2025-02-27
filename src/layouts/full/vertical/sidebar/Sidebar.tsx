import React from 'react';
import { Sidebar } from 'flowbite-react';
import SidebarContent from './Sidebaritems';
import NavItems from './NavItems';
import NavCollapse from './NavCollapse';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../shared/logo/FullLogo';

const SidebarLayout = () => {
  return (
    <>
      <div className="xl:block hidden">
        <div className="flex">
          <Sidebar
            className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className="px-6 py-4 flex items-center brand-logo">
              <FullLogo />
            </div>
            <SimpleBar className="h-[calc(100vh_-_85px)] ">
              <Sidebar.Items className="rtl:pe-0 rtl:ps-3 px-4 mt-2">
                <div className="collpase-items">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 rounded-xl h-16 w-16 flex items-center justify-center text-white text-2xl font-bold">
                      T
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Tuhin Thakur</p>
                      <p className="text-sm font-medium text-gray-600">(Organizer)</p>
                    </div>
                  </div>
                </div>

                <Sidebar.ItemGroup className="sidebar-nav">
                  {SidebarContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="text-link dark:text-white/70 font-semibold caption font-semibold leading-6 tracking-widest text-xs text-sm  pb-2 uppercase ">
                        <span className="hide-menu">{item.heading}</span>
                      </h5>
                      <Icon
                        icon="solar:menu-dots-bold"
                        className="text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon"
                        height={18}
                      />

                      {item.children?.map((child, index) => (
                        <React.Fragment key={child.id && index}>
                          {child.children ? (
                            <div className="collpase-items">
                              <NavCollapse item={child} />
                            </div>
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </SimpleBar>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
