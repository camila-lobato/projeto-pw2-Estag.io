import 'express';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    flashMessages?: { [key: string]: any[] };
    old?: any;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    addFlash(type: string, message: any): void;
    setOld(data: any): void;
       getOld?: () => any;
      getFlash?: () => { [key: string]: any[] } | undefined;
      session: SessionData; // express-session
      flash: any
  }
}

interface Response {
      // se você usa res.locals.getOld ou res.locals.getFlash, considere tipar locals também:
      locals: {
        getOld?: () => any;
        getFlash?: () => { [key: string]: any[] } | undefined;
        [key: string]: any;
      };
    }

declare global {
  namespace Express {
    interface Request {
      addFlash?: (type: string, message: any) => void;
      setOld?: (data: any) => void;
      session: any; // Express-session adiciona isso
    }
  }
}
