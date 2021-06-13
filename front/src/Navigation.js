import React from "react";
import { NavigationWrapper, Button } from "./styles";

const Navigation = ({ navs, goToPage }) => {
  if (!navs || navs.length === 0) return <div />;
  return (
    <NavigationWrapper>
      {navs[0] && (
        <Button onClick={() => goToPage(navs[0])}>previous page</Button>
      )}
      {navs[1] && <Button onClick={() => goToPage(navs[1])}>next page</Button>}
    </NavigationWrapper>
  );
};

export default Navigation;
