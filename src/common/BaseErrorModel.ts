export class BaseErrorModel {
  public constructor(
    private readonly errors: {
      body: string[];
    },
  ) {}
}

const p = new BaseErrorModel({ body: ['a', 'b'] });
