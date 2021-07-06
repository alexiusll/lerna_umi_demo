/*
 * @Author: linkenzone
 * @Date: 2021-06-30 14:42:03
 * @Descripttion: Do not edit
 */
import { View2D, View3D, VtkViewProvider, SliceUI } from '@/extension/vtkViewer';

const BaseDemo: React.FC<unknown> = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '320px' }}>
        <SliceUI />
      </div>

      <div
        style={{
          width: '100%',
          height: '90vh',
          display: 'grid',
          gridColumnGap: '2px',
          gridRowGap: '2px',
          gridTemplateRows: '1fr 1fr',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <VtkViewProvider uuid="b5981569-302c412a-6ced2c80-fd877f65-933991a4">
          <View2D viewType="x" />
          <View3D />
          <View2D viewType="y" />
          <View2D viewType="z" />
        </VtkViewProvider>
      </div>
    </div>
  );
};

export default BaseDemo;
