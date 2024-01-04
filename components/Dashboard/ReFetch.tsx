"use client";

import React, { useState, useEffect } from "react";

type ReFetchButtonProps = {
  onFetch: () => void;
};

const ReFetchButton: React.FC<ReFetchButtonProps> = ({ onFetch }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleClick = () => {
    setShouldRefetch(true);
  };

  useEffect(() => {
    if (shouldRefetch) {
      onFetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, onFetch]);

  return <button onClick={handleClick}>Re-fetch Project</button>;
};

export default ReFetchButton;
