import {
  ClientProfileCoreDTO,
  FreelancerProfileCoreDTO,
  JobCoreDTO,
  UserCoreDTO,
} from "./CoreDTO";

//------------user type------------
export interface UserType extends UserCoreDTO {
  FreelancerProfile?: FreelancerProfileCoreDTO | null;
  ClientProfile?: ClientProfileCoreDTO | null;
}

export type ClientWithUser = ClientProfileCoreDTO & {
  user: UserCoreDTO;
};

export type JobWithClient = JobCoreDTO & {
  client: ClientWithUser;
};
