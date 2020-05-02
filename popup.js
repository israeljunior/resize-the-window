let config = {
  resolutions: [
    {
      title: 'Mobile',
      icon: 'mobile',
      width: 375,
      height: 667
    },
    {
      title: 'Mobile landscape',
      icon: 'mobile-landscape',
      width: 667,
      height: 375
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
  positions: [
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
  const {
    width,
    height,
    left,
    top
  } = props;

  const windowCurrent = chrome.windows.WINDOW_ID_CURRENT;

  chrome.windows.update(
    windowCurrent,
    {
      width,
      height,
      left,
      top,
      focused: true
    }
  );
}

function buildResolutions() {
  const resolutionsContainer = document.querySelector("#resolutions");
  
  const createItem = (props) => {
    const li = document.createElement('li');

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

function buildPositions() {
  const positionsContainer = document.querySelector("#positions");
  
  const createItem = (props) => {
    const li = document.createElement('li');

    const newWidth = Math.round(window.screen.availWidth * props.factor);
    const newHeight = window.screen.availHeight;

    const getLeft = () => {
      if (props.stick == 'right') {
        return window.screen.availWidth - Math.round(newWidth);
      } else {
        return 0;
      }
    }

    li.addEventListener('click', () => {
      resizeWindow({
        width: newWidth,
        height: newHeight,
        left: getLeft(),
        top: 0
      });
    })

    li.innerHTML = `
      <i class="icon ${props.icon}"></i>
      <span>${props.title}</span>
      <small>${newWidth} x ${newHeight} px</small>
    `;

    return li;
  }

  config.positions.map((item) => {
    let li = createItem(item);
    
    positionsContainer.append(li);
  });
}

function buildMenu() {
  buildResolutions();
  buildPositions();
}

window.addEventListener('load', () => {
  buildMenu();
});