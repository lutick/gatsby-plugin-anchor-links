import React from "react";
import { Link } from "gatsby";

import {
  handleLinkClick,
  stripHashedLocation,
  handleStrippedLinkClick,
  isBrowser
} from "../utils";
import { anchorLinkTypes } from "../types";

export function AnchorLink({
  to,
  title,
  children,
  className,
  stripHash = false,
  onClick
}) {
  const handleClick = e => {
    if (stripHash) {
      handleStrippedLinkClick(to, e);
    } else {
      handleLinkClick(to, e);
    }
  };
  const linkProps = {
    to: stripHash ? stripHashedLocation(to) : to,
    onClick: e => {
      if (!onClick) {
        handleClick(e);
        return;
      }

      const isSamePage =
        isBrowser && window.location.pathname === stripHashedLocation(to);
      if (isSamePage) {
        e.preventDefault();
      }
      onClick(e);
      setImmediate(() => handleClick(e));
    }
  };

  /**
   * Optional props
   */
  if (title) linkProps.title = title;
  if (className) linkProps.className = className;

  return <Link {...linkProps}>{Boolean(children) ? children : title}</Link>;
}

AnchorLink.propTypes = anchorLinkTypes;
