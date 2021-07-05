/*
 * @Author: linkenzone
 * @Date: 2021-06-19 23:43:28
 * @Descripttion: Do not edit
 */
import React, { useState, useEffect } from 'react';

import readImageFile from 'itk/readImageFile';
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry';

// Force DataAccessHelper to have access to various data source
import 'vtk.js/Sources/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import 'vtk.js/Sources/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import axios from 'axios';

const BaseDemo: React.FC<unknown> = () => {
  const root: any = React.useRef();

  useEffect(() => {
    // const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
    //   background: [0, 0, 0],
    // });

    const view3d = document.getElementById('view3d');
    const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
      rootContainer: view3d,
      containerStyle: {
        height: '100%',
        overflow: 'hidden',
      },
      background: [0, 0, 0],
    });

    const renderWindow = fullScreenRenderWindow.getRenderWindow();
    const renderer = fullScreenRenderWindow.getRenderer();

    // fullScreenRenderWindow.addController(root.current);

    const actor = vtkActor.newInstance();
    const mapper = vtkMapper.newInstance();
    const marchingCube = vtkImageMarchingCubes.newInstance({
      contourValue: 0.0,
      computeNormals: true,
      mergePoints: true,
    });

    actor.setMapper(mapper);
    // mapper.setInputConnection(marchingCube.getOutputPort());

    function updateIsoValue(e) {
      const isoValue = Number(e.target.value);
      marchingCube.setContourValue(isoValue);
      renderWindow.render();
    }

    axios.get('se0.dcm', { responseType: 'blob' }).then((response) => {
      const jsFile = new File([response.data], 'se0.dcm'); // `${index}.dcm`
      console.log('jsFile', jsFile);
      readImageFile(null, jsFile).then(({ webWorker, image }) => {
        image.name = jsFile.name;
        console.log('image', image);
        const imageData = vtkITKHelper.convertItkToVtkImage(image);
        console.log('imageData', imageData);

        mapper.setInputData(imageData);

        const dataRange = imageData.getPointData().getScalars().getRange();
        const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;

        // const el = document.getElementById('isoValue');
        // el.setAttribute('min', dataRange[0]);
        // el.setAttribute('max', dataRange[1]);
        // el.setAttribute('value', firstIsoValue);
        // el.addEventListener('input', updateIsoValue);

        marchingCube.setContourValue(firstIsoValue);
        renderer.addActor(actor);
        renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
        renderer.resetCamera();
        renderWindow.render();
      });
    });

    // const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    // marchingCube.setInputConnection(reader.getOutputPort());

    // reader
    //   .setUrl(`https://kitware.github.io/vtk-js/data/volume/headsq.vti/index.json`, {
    //     loadData: true,
    //   })
    //   .then(() => {
    //     const data = reader.getOutputData();
    //     console.log('data', data);
    //     const dataRange = data.getPointData().getScalars().getRange();
    //     const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;

    //     const el = document.getElementById('isoValue');
    //     el.setAttribute('min', dataRange[0]);
    //     el.setAttribute('max', dataRange[1]);
    //     el.setAttribute('value', firstIsoValue);
    //     el.addEventListener('input', updateIsoValue);

    //     marchingCube.setContourValue(firstIsoValue);
    //     renderer.addActor(actor);
    //     renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
    //     renderer.resetCamera();
    //     renderWindow.render();
    //   });
  }, []);

  return (
    <>
      {/* <div ref={root}>233</div> */}

      {/* <table ref={root} style={{ top: '200px' }}>
        <tr>
          <td>Iso value</td>
          <td>
            <input id="isoValue" type="range" min="0.0" max="1.0" step="0.05" value="0.0" />
          </td>
        </tr>
      </table> */}

      <div id="view3d"></div>
    </>
  );
};

export default BaseDemo;
