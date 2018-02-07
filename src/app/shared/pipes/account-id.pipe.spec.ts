import { AccountIdPipe } from './account-id.pipe';

describe('AccountIdPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountIdPipe();
    expect(pipe).toBeTruthy();
  });
});
