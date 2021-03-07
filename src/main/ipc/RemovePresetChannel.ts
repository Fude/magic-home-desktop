import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import PresetModel from 'main/models/PresetModel';

export default class RemovePresetChannel implements IpcChannelInterface {
  public getName() {
    return 'remove-preset';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const presetIndex = request.params.index as number;

    const model = PresetModel.init();
    let presets = model.list;

    presets = presets.filter((value, index) => presetIndex !== index)

    model.list = presets;

    event.sender.send(request.responseChannel, true);
  }
}
