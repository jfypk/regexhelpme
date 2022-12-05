import React, { useEffect } from "react";

const GoogleAdsenseContainer = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block"
      }}
      data-ad-client={process.env.ADSENSE_CLIENT_ID}
      data-ad-slot=<slot-id>
    />
  );
};

export default GoogleAdsenseContainer;
