/*
 * @Author: linkenzone
 * @Date: 2021-06-08 21:43:38
 * @Descripttion: Do not edit
 */

import 'vtk.js/Sources/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Volume';

// Force DataAccessHelper to have access to various data source
import 'vtk.js/Sources/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import 'vtk.js/Sources/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';

import {
  View,
  VolumeRepresentation,
  VolumeController,
  Reader,
  ImageData,
  PointData,
  DataArray,
  VolumeDataRepresentation,
} from 'react-vtk-js';

import React, { useState, useEffect } from 'react';
import readImageFile from 'itk/readImageFile';
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';
import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import proxyConfiguration from './proxyManagerConfiguration';
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox';
import axios from 'axios';

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import files_path from './files';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkVolumeController from 'vtk.js/Sources/Interaction/UI/VolumeController';

import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

import style from './index.css';

import vtkFPSMonitor from 'vtk.js/Sources/Interaction/UI/FPSMonitor';

const { VtkDataTypes } = vtkDataArray;
const fpsMonitor = vtkFPSMonitor.newInstance();
const userParams = vtkURLExtract.extractURLParameters();

const mapper = vtkVolumeMapper.newInstance();
const actor = vtkVolume.newInstance();

const BaseDemo: React.FC<unknown> = () => {
  const root: any = React.useRef();

  // 待上传的文件列表
  const [fileList, setFileList] = useState<any[]>([]);

  const [_imageData, setImageData] = useState(null);

  const [_actor, setActor] = useState(null);

  const [_mapper, setMapper] = useState(null);

  const printImage = (image: any) => {
    function replacer(key: any, value: any) {
      if (!!value && value.byteLength !== undefined) {
        return `${String(value.slice(0, 6))}...`;
      }
      return value;
    }
    console.log(image);
    console.log(JSON.stringify(image, replacer, 4));
    // outputTextArea.textContent = JSON.stringify(image, replacer, 4);
  };

  const getImages = async (_fileList: any) => {
    const files_paths: string[] = [];

    await axios
      .get(
        'http://27.17.30.150:20083/series/bfd34afd-f97a9f7c-c0551428-93a0c48a-0285c8ce?_=1624179883017',
      )
      .then((response) => {
        // console.log('response', response.data.Instances);

        const { Instances } = response.data;

        // eslint-disable-next-line guard-for-in
        for (const index in Instances) {
          files_paths.push(`http://27.17.30.150:20083/instances/${Instances[index]}/file`);
        }
      });

    const fetchFiles = files_paths.map((file_path, index) => {
      const path = file_path;
      return axios
        .get(path, { responseType: 'blob' })
        .then((response) => {
          const jsFile = new File([response.data], `${index}.dcm`); // `${index}.dcm` ` file_path.split('/').slice(-1)[0]`
          return jsFile;
        })
        .catch(() => {
          console.log('一个文件获取失败');
        });
    });

    Promise.all(fetchFiles).then((files) => {
      console.log('files', files);

      // readImageDICOMFileSeries
      readImageDICOMFileSeries(files).then(({ webWorker, image }) => {
        // webWorker.terminate();
        // printImage(image);
        image.name = files[0].name;

        console.log('image', image);

        const imageData = vtkITKHelper.convertItkToVtkImage(image);

        setImageData(imageData);

        console.log('imageData', imageData);
        console.log('imageData', imageData.getPointData());
        console.log('imageData', imageData.getPointData().getScalars());
        console.log('imageData', imageData.getPointData().getScalars().getData());
        console.log('imageData', imageData.getPointData().getScalars().getDataType());

        const view3d = document.getElementById('view3d');
        const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
          rootContainer: view3d,
          containerStyle: {
            height: '100%',
            overflow: 'hidden',
          },
          background: [0, 0, 0],
        });
        const renderer = fullScreenRenderer.getRenderer();
        const renderWindow = fullScreenRenderer.getRenderWindow();
        renderWindow.getInteractor().setDesiredUpdateRate(15);

        // const actor = vtkActor.newInstance();
        // const mapper = vtkMapper.newInstance();

        // mapper.setColorModeToDirectScalars();
        // mapper.setScalarModeToUsePointFieldData();

        // actor.setMapper(mapper);
        // actor.getProperty().setOpacity(0.15);
        // actor.getProperty().setEdgeColor(0, 0, 0);

        // const marchingCubes = vtkImageMarchingCubes.newInstance({
        //   contourValue: 125,
        //   computeNormals: false,
        //   mergePoints: false,
        // });
        // marchingCubes.setInputData(imageData);

        // mapper.setInputConnection(marchingCubes.getOutputPort());

        // renderer.addActor(actor);
        // renderer.resetCamera();
        // renderWindow.render();

        const source = imageData;
        // const mapper = vtkVolumeMapper.newInstance();
        // const actor = vtkVolume.newInstance();

        // Pipeline handling
        actor.setMapper(mapper);
        mapper.setInputData(source);
        // mapper.setSampleDistance(0.7);

        const sampleDistance =
          0.7 *
          Math.sqrt(
            source
              .getSpacing()
              .map((v) => v * v)
              .reduce((a, b) => a + b, 0),
          );
        mapper.setSampleDistance(sampleDistance);

        renderer.addActor(actor);

        const lookupTable = vtkColorTransferFunction.newInstance();
        const piecewiseFunction = vtkPiecewiseFunction.newInstance();

        // create color and opacity transfer functions
        lookupTable.addRGBPoint(200.0, 0.4, 0.2, 0.0);
        lookupTable.addRGBPoint(2000.0, 1.0, 1.0, 1.0);

        piecewiseFunction.addPoint(200.0, 0.0);
        piecewiseFunction.addPoint(1200.0, 0.5);
        piecewiseFunction.addPoint(3000.0, 0.8);

        actor.getProperty().setRGBTransferFunction(0, lookupTable);
        actor.getProperty().setScalarOpacity(0, piecewiseFunction);

        actor.getProperty().setScalarOpacityUnitDistance(0, 4.5);
        actor.getProperty().setInterpolationTypeToLinear();
        actor.getProperty().setUseGradientOpacity(0, 1);
        actor.getProperty().setGradientOpacityMinimumValue(0, 15);
        actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
        actor.getProperty().setGradientOpacityMaximumValue(0, 100);
        actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
        actor.getProperty().setShade(1);
        actor.getProperty().setAmbient(0.2);
        actor.getProperty().setDiffuse(0.7);
        actor.getProperty().setSpecular(0.3);
        actor.getProperty().setSpecularPower(8.0);

        // Control UI
        const controllerWidget = vtkVolumeController.newInstance({
          size: [400, 150],
          rescaleColorMap: true,
        });
        controllerWidget.setContainer(view3d);
        controllerWidget.setupContent(renderWindow, actor, true);

        fullScreenRenderer.setResizeCallback(({ width, height }) => {
          // 2px padding + 2x1px boder + 5px edge = 14
          if (width > 414) {
            controllerWidget.setSize(400, 150);
          } else {
            controllerWidget.setSize(width - 14, 150);
          }
          controllerWidget.render();
          fpsMonitor.update();
        });

        setActor(actor);
        setMapper(mapper);

        // First render
        renderer.resetCamera();
        renderWindow.render();
      });
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  const array = [];
  while (array.length < 1000) {
    array.push(Math.random());
  }

  return (
    <>
      <div ref={root}></div>
      <div id="view3d"></div>

      {/* <div style={{ width: '85vw', height: '85vh' }}>
        <View id="0">
          <VolumeDataRepresentation
            spacing={_imageData ? _imageData.getSpacing() : [1, 1, 1]}
            dimensions={_imageData ? _imageData.getDimensions() : [10, 10, 10]}
            origin={_imageData ? _imageData.getOrigin() : [0, 0, 0]}
            scalars={_imageData ? _imageData.getPointData().getScalars().getData() : []}
            scalarsType={
              _imageData ? _imageData.getPointData().getScalars().getDataType() : 'Int16Array'
            }
            rescaleColorMap={false}
          />
        </View>
      </div> */}
    </>
  );
};

export default BaseDemo;
