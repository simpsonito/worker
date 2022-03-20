import { EventResult } from "../../src/models";
import { loadConfigs } from "../../src/configs";
import { Database } from "../../src/database";

const connect = async () => {
  const { mongoTestAddress } = loadConfigs();
  await Database.connect(mongoTestAddress);
}
const disconnect = async () => {
  await Database.disconnect();
}
const dbTeardown = async () => {
  await EventResult.deleteMany({});
}
describe('Event test', () => {
  beforeAll(async () => {
    await connect();
    await dbTeardown();
    await EventResult.create({
      event: 'start',
      horse: {
        id: 1,
        name: 'Crazy eyes'
      },
      time: 0,
    });
  });

  afterAll(async () => {
    await dbTeardown();
    await disconnect();
  });

  describe('Create method', () => {
    it('should create and return an correct Event object', async () => {
      const payload = { 
        event: 'finish',
        horse: { 
          id: 23, 
          name: 'George'
        },
        time: 17391 
      }
      const event = await EventResult.create(payload);
      expect(event).not.toBeNull();
      expect(event.horse.name).toEqual('George');
    });
  });
});

