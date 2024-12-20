import {AuthError, Session} from "@supabase/supabase-js";

export default interface userFetchedData {
    data:  DataClass;
    error: AuthError | null;
}

export interface DataClass {
    session: Session | null;
}