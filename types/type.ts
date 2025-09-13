import { ClientProfileCoreDTO, FreelancerProfileCoreDTO, UserCoreDTO } from "./CoreDTO";


//------------user type------------
export interface UserType extends UserCoreDTO {
  FreelancerProfile?: FreelancerProfileCoreDTO | null;
  ClientProfile?: ClientProfileCoreDTO | null;
}