/*
 * @Author: linkenzone
 * @Date: 2021-06-25 15:27:34
 * @Descripttion: Do not edit
 */

import React, { useState, useRef, useEffect } from 'react';

import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';

const Demo: React.FC<{}> = () => {
  const vtkContainerRef = useRef(null);
  const context = useRef<any | null>(null);
  const [coneResolution, setConeResolution] = useState(6);
  const [representation, setRepresentation] = useState(2);

  useEffect(() => {
    if (!context.current) {
      const genericRenderWindow = vtkGenericRenderWindow.newInstance();
      genericRenderWindow.setContainer(vtkContainerRef.current);
      genericRenderWindow.resize();

      const coneSource = vtkConeSource.newInstance({ height: 1.0 });

      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

      const renderer = genericRenderWindow.getRenderer();
      const renderWindow = genericRenderWindow.getRenderWindow();

      renderer.addActor(actor);
      renderer.resetCamera();
      renderWindow.render();

      //   fullScreenRenderer.setResizeCallback(({ width, height }) => {
      //     console.log('resize');
      //   });

      context.current = {
        genericRenderWindow,
        renderWindow,
        renderer,
        coneSource,
        actor,
        mapper,
      };
    }

    return () => {
      if (context.current) {
        const { genericRenderWindow, coneSource, actor, mapper } = context.current;
        actor.delete();
        mapper.delete();
        coneSource.delete();
        genericRenderWindow.delete();
        context.current = null;
      }
    };
  }, [vtkContainerRef]);

  useEffect(() => {
    if (context.current) {
      const { coneSource, renderWindow } = context.current;
      coneSource.setResolution(coneResolution);
      renderWindow.render();
    }
  }, [coneResolution]);

  useEffect(() => {
    if (context.current) {
      const { actor, renderWindow } = context.current;
      actor.getProperty().setRepresentation(representation);
      renderWindow.render();
    }
  }, [representation]);

  return (
    <>
      <table
        style={{
          position: 'absolute',
          margin: '30px',
          background: 'white',
          padding: '12px',
        }}
      >
        <tbody>
          <tr>
            <td>
              <select
                value={representation}
                style={{ width: '100%' }}
                onInput={(ev) => setRepresentation(Number(ev.target.value))}
              >
                <option value="0">Points</option>
                <option value="1">Wireframe</option>
                <option value="2">Surface</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="range"
                min="4"
                max="80"
                value={coneResolution}
                onChange={(ev) => setConeResolution(Number(ev.target.value))}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div ref={vtkContainerRef} style={{ height: '640px' }} />
    </>
  );
};

export default Demo;
