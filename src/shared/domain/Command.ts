export interface Command<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
