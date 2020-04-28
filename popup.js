let config = {
  resolutions: [
    {
      title: 'Mobile',
      icon: 'mobile',
      width: 320,
      height: 568
    },
    {
      title: 'Mobile landscape',
      icon: 'mobile-landscape',
      width: 375,
      height: 667
    },
    {
      title: 'Tablet',
      icon: 'tablet',
      width: 1024,
      height: 768
    },
    {
      title: 'Tablet landscape',
      icon: 'tablet-landscape',
      width: 768,
      height: 1024
    },
    {
      title: 'Laptop 16:9',
      icon: 'laptop',
      width: 1366,
      height: 768
    },
    {
      title: 'Laptop 16:10',
      icon: 'laptop',
      width: 1440,
      height: 900
    },
    {
      title: 'Desktop',
      icon: 'desktop',
      width: 1680,
      height: 1050
    },
    {
      title: 'Desktop 1080p',
      icon: 'desktop',
      width: 1920,
      height: 1080
    },
    {
      title: 'Desktop 1440p',
      icon: 'desktop',
      width: 2560,
      height: 1440
    }
  ],
  sizes: [
    {
      icon: 'third-left',
      title: 'Left 1/3',
      factor: 0.33,
      stick: 'left'
    },
    {
      icon: 'half-left',
      title: 'Left 50%',
      factor: 0.5,
      stick: 'left'
    },
    {
      icon: 'third-right',
      title: 'Right 1/3',
      factor: 0.33,
      stick: 'right'
    },
    {
      icon: 'half-right',
      title: 'Right 50%',
      factor: 0.5,
      stick: 'right'
    }
  ]
};

function resizeWindow(props) {
  const windowNewProps = {
    width: props.width,
    height: props.height,
    focused: true
  };

  const windowCurrent = chrome.windows.WINDOW_ID_CURRENT;

  chrome.windows.update(
    windowCurrent,
    windowNewProps
  );
}

function appendResolutions() {
  let resolutionsContainer = document.querySelector("#resolutions");

  let createItem = (props) => {
    let li = document.createElement('li');
    li.innerHTML = `
      <i class="icon ${props.icon}"></i>
      <span>${props.title}</span>
      <small>${props.width} x ${props.height} px</small>
    `;
    
    li.addEventListener('click', () => {
      resizeWindow(props);
    })
    
    return li;
  }
  
  config.resolutions.map((item) => {
    let li = createItem(item);
    
    resolutionsContainer.append(li);
  });
}

function appendSizes() {
  let sizesContainer = document.querySelector("#sizes");
  
  let createItem = (props) => {
    let li = document.createElement('li');
    const WW = Math.round(window.screen.availWidth * props.factor);
    const WH = Math.round(window.screen.availHeight);

    if (props.stick === 'right') {
      newLeft = window.screen.availWidth - Math.round(WW);
    } else {
      newLeft = 0;
    }

    li.addEventListener('click', () => {
      resizeWindow({left: newLeft, width: WW, height: WH, ...props});
    })

    li.innerHTML = `
      <i class="icon ${props.icon}"></i>
      <span>${props.title}</span>
      <small>${WW} x ${WH} px</small>
    `;

    return li;
  }

  config.sizes.map((item) => {
    let li = createItem(item);
    
    sizesContainer.append(li);
  });
}

window.addEventListener('load', () => {
  appendResolutions();
  appendSizes();
});
