const axios = require("axios");
const CommissionConfigService = require("./ConfigService");

jest.mock("axios");

class MockShape {
  constructor(data) {
    Object.assign(this, data);
  }
}

const mockUrl = "https://mockapi.com/any-config";
const axiosResMock = {
  data: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  },
};

describe("CommissionConfigService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and cache configuration data", async () => {
    axios.get.mockResolvedValue(axiosResMock);

    const service = new CommissionConfigService(mockUrl, MockShape);

    // First call: should fetch data from the URL
    const fistConfig = await service.getConfig();
    expect(fistConfig).toEqual(axiosResMock.data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(mockUrl);

    // Second call: should return cached data
    const secondConfig = await service.getConfig();
    expect(secondConfig).toEqual(axiosResMock.data);
    expect(axios.get).toHaveBeenCalledTimes(1); // No additional GET request
  });

  it("should handle fetch error", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));
    const service = new CommissionConfigService(mockUrl, MockShape);

    await expect(service.getConfig()).rejects.toThrow();
  });
});
